/*
 * particle-funnel.js
 *
 * Canvas 2D reimplementation of the "converging lanes + signal trails" hero motion
 * seen on v7labs.com. The original runs on Three.js, but every piece of geometry sits
 * on a single plane facing the camera, so there is nothing for a 3D pipeline to do.
 * Drawing it flat removes the dependency and keeps the whole thing under 200 lines.
 *
 * The world units below mirror what a 45deg-FOV camera parked at z=90 would frame,
 * so tuning numbers (spreadHeight, waveHeight, ...) stay on the original's scale.
 *
 * Classic script, not a module — so index.html still works opened straight from disk.
 */
(function (global) {
  'use strict';

  var FOV_RAD = (45 * Math.PI) / 180;
  var CAMERA_Z = 90;
  var VISIBLE_H = 2 * Math.tan(FOV_RAD / 2) * CAMERA_Z; // ~74.56 world units tall

  var SEGMENTS = 150; // points per lane polyline
  var MAX_TRAIL = 50; // ring-buffer capacity per signal
  var MAX_LANES = 200;
  var MAX_SIGNALS = 200;

  var DEFAULTS = {
    bgColor: '#1c1c1c', // null => leave the canvas transparent
    lineColor: '#303030',
    signalColor: '#ff6300',
    lineOpacity: 0.55,
    lineCount: 80,
    signalCount: 90,
    spreadHeight: 30, // half-height of the fan, in world units
    convergePointX: 50, // % of viewport width where the lanes pinch together
    convergeSpread: 0, // 0 => lanes merge into one line at the pinch; >0 keeps a ribbon
    curvePower: 0.82, // >1 pinches harder near the convergence point
    mirror: false, // true => lanes fan back out past the pinch (hourglass, not funnel)
    waveSpeed: 1,
    waveHeight: 0.15,
    dotSpeed: 0.2,
    trailLength: 10,
    blend: 'lighter', // canvas composite op for the signals
    lineWeight: 1, // stroke width in *device* pixels, matching WebGL hairlines
    signalWeight: 1
  };

  function ParticleFunnel(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cfg = {};
    for (var k in DEFAULTS) this.cfg[k] = DEFAULTS[k];
    this.set(options || {});

    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.visibleW = 0;
    this.scale = 1;
    this.time = 0;
    this.lastFrame = 0;
    this.visible = true;
    this.rafId = null;

    this.signals = [];
    for (var i = 0; i < MAX_SIGNALS; i++) {
      this.signals.push({
        lane: 0,
        speed: 0.2 + Math.random() * 0.5,
        progress: Math.random(),
        x: new Float32Array(MAX_TRAIL),
        y: new Float32Array(MAX_TRAIL),
        head: 0
      });
    }
    this.assignLanes();

    this.reducedMotion =
      global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.observe();
    this.resize();
  }

  ParticleFunnel.prototype.set = function (options) {
    for (var k in options) {
      if (options[k] !== undefined) this.cfg[k] = options[k];
    }
    if (options && options.lineCount && this.signals) this.assignLanes();
    return this;
  };

  ParticleFunnel.prototype.assignLanes = function () {
    var n = Math.max(1, this.cfg.lineCount);
    for (var i = 0; i < this.signals.length; i++) {
      this.signals[i].lane = Math.floor(Math.random() * n);
    }
  };

  ParticleFunnel.prototype.observe = function () {
    var self = this;

    if (global.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(function () {
        self.resize();
      });
      this.resizeObserver.observe(this.canvas);
    } else {
      this.onWindowResize = function () {
        self.resize();
      };
      global.addEventListener('resize', this.onWindowResize);
    }

    // Stop burning frames once the hero has scrolled away.
    if (global.IntersectionObserver) {
      this.visibilityObserver = new IntersectionObserver(
        function (entries) {
          self.visible = entries[0] ? entries[0].isIntersecting : true;
        },
        { threshold: 0 }
      );
      this.visibilityObserver.observe(this.canvas);
    }
  };

  ParticleFunnel.prototype.resize = function () {
    var rect = this.canvas.getBoundingClientRect();
    var w = rect.width || this.canvas.clientWidth;
    var h = rect.height || this.canvas.clientHeight;
    if (!w || !h) return;

    this.dpr = Math.min(global.devicePixelRatio || 1, 2);
    this.width = w;
    this.height = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.scale = h / VISIBLE_H; // world units -> CSS px
    this.visibleW = VISIBLE_H * (w / h);

    // Trails store screen-space pixels. A resize (notably the reflow when the webfont
    // lands) moves every point, so stale history would be drawn as long stray streaks.
    for (var i = 0; i < this.signals.length; i++) this.signals[i].head = 0;

    if (this.reducedMotion) this.draw(0);
  };

  /*
   * A lane is a horizontal run across the viewport. Approaching the convergence point it
   * bows away from the centre line by `shape`; past it `shape` holds at whatever the pinch
   * left, which is what makes the signals look like they're being funnelled into a channel.
   *
   * `convergeSpread` is the floor under `shape`. At 0 every lane lands on y=0 and the
   * channel is a single hairline. Above 0 the lanes stay separated through and past the
   * pinch, so the run reads as a ribbon of parallel tracks rather than one merged line.
   *
   * With `mirror` the far side bows back out by the same curve, turning the funnel into
   * an hourglass: lanes gather in from the left, pinch at the waist, then fan out right.
   */
  ParticleFunnel.prototype.pathPoint = function (t, laneIndex, laneCount, out) {
    var cfg = this.cfg;
    var cpx = cfg.convergePointX / 100;
    var lenIn = cpx * this.visibleW; // run leading into the pinch
    var lenOut = this.visibleW - lenIn; // run leading away from it
    var x = -lenIn + t * this.visibleW;

    // 1 at the pinch, 0 at the edge this half runs to.
    var ratio;
    if (x < 0) {
      ratio = lenIn > 0 ? (x + lenIn) / lenIn : 1;
    } else if (cfg.mirror && lenOut > 0) {
      ratio = (lenOut - x) / lenOut;
    } else {
      ratio = 1; // past the pinch — hold the pinched width
    }

    var shape = Math.pow((Math.cos(ratio * Math.PI) + 1) / 2, cfg.curvePower);
    shape = cfg.convergeSpread + (1 - cfg.convergeSpread) * shape;

    var spread = (laneIndex / laneCount - 0.5) * 2;
    var y = spread * cfg.spreadHeight * shape;
    y += Math.sin(this.time * cfg.waveSpeed + x * 0.1 + laneIndex) * cfg.waveHeight * shape;

    out[0] = x;
    out[1] = y;
    return out;
  };

  ParticleFunnel.prototype.draw = function (dt) {
    var ctx = this.ctx;
    var cfg = this.cfg;
    var w = this.width;
    var h = this.height;
    var scale = this.scale;
    var cx = w / 2 + this.visibleW * (cfg.convergePointX / 100 - 0.5) * scale;
    var cy = h / 2;
    var laneCount = Math.min(cfg.lineCount, MAX_LANES);
    var pt = [0, 0];
    var i, j;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (cfg.bgColor) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = cfg.bgColor;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    // --- lanes -------------------------------------------------------------
    // Every lane shares one stroke style, so they go into a single path.
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = cfg.lineOpacity;
    ctx.strokeStyle = cfg.lineColor;
    ctx.lineWidth = cfg.lineWeight / this.dpr;
    ctx.beginPath();
    for (i = 0; i < laneCount; i++) {
      for (j = 0; j < SEGMENTS; j++) {
        this.pathPoint(j / (SEGMENTS - 1), i, laneCount, pt);
        var lx = cx + pt[0] * scale;
        var ly = cy - pt[1] * scale;
        if (j === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
    }
    ctx.stroke();

    // --- signals -----------------------------------------------------------
    var signalCount = Math.min(cfg.signalCount, MAX_SIGNALS);
    var trailLen = Math.min(cfg.trailLength, MAX_TRAIL);
    var step = dt * 60; // keep the original's per-frame tuning at any refresh rate

    for (i = 0; i < signalCount; i++) {
      var sig = this.signals[i];
      if (sig.lane >= laneCount) sig.lane = Math.floor(Math.random() * laneCount);

      sig.progress += sig.speed * 0.005 * cfg.dotSpeed * step;
      if (sig.progress > 1) {
        sig.progress = 0;
        sig.head = 0;
      }

      this.pathPoint(sig.progress, sig.lane, laneCount, pt);
      var slot = sig.head % MAX_TRAIL;
      sig.x[slot] = cx + pt[0] * scale;
      sig.y[slot] = cy - pt[1] * scale;
      sig.head++;
    }

    // Trail alpha depends only on how far back a segment sits, so batch by that
    // index: 10 strokes per frame instead of ~900.
    ctx.globalCompositeOperation = cfg.blend;
    ctx.strokeStyle = cfg.signalColor;
    ctx.lineWidth = cfg.signalWeight / this.dpr;
    ctx.lineCap = 'round';

    for (j = 0; j < trailLen - 1; j++) {
      var alpha = 1 - j / trailLen;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      var drew = false;
      for (i = 0; i < signalCount; i++) {
        var s = this.signals[i];
        var have = Math.min(s.head, trailLen);
        if (j + 1 >= have) continue;
        var a = (s.head - 1 - j + MAX_TRAIL) % MAX_TRAIL;
        var b = (s.head - 2 - j + MAX_TRAIL) % MAX_TRAIL;
        ctx.moveTo(s.x[a], s.y[a]);
        ctx.lineTo(s.x[b], s.y[b]);
        drew = true;
      }
      if (drew) ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  ParticleFunnel.prototype.start = function () {
    if (this.rafId !== null) return this;
    if (this.reducedMotion) {
      this.draw(0);
      return this;
    }
    var self = this;
    this.lastFrame = performance.now();
    var loop = function (now) {
      self.rafId = requestAnimationFrame(loop);
      var dt = Math.min((now - self.lastFrame) / 1000, 0.05); // clamp tab-switch jumps
      self.lastFrame = now;
      if (!self.visible) return;
      self.time += dt;
      self.fps = 1 / Math.max(dt, 0.0001);
      self.draw(dt);
    };
    this.rafId = requestAnimationFrame(loop);
    return this;
  };

  ParticleFunnel.prototype.stop = function () {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    return this;
  };

  ParticleFunnel.prototype.destroy = function () {
    this.stop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.visibilityObserver) this.visibilityObserver.disconnect();
    if (this.onWindowResize) global.removeEventListener('resize', this.onWindowResize);
  };

  ParticleFunnel.DEFAULTS = DEFAULTS;
  global.ParticleFunnel = ParticleFunnel;
})(window);
