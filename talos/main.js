/* =====================================================
   TALOS landing — config-first, no framework
   브랜드명·태그라인·키는 여기서만 수정한다 (하드코딩 금지)
   ===================================================== */
const CONFIG = {
  BRAND: '탈로스',
  BRAND_EN: 'TALOS',
  TAGLINE: '제조 AX 온톨로지의 시작, 탈로스',
  CONTACT_EMAIL: 'hello@joshua.site',
  API_ENDPOINT: '/api/contact',
  PIXEL_ID: '',            // Meta Pixel — 미설정 시 조용히 스킵
  SHOW_CLIENT_LOGOS: false, // 고객사 로고 게재 동의 확보 후 true
  CLIENT_LOGOS: [],         // 동의 확보 시 [{name, src}] 형태로 추가
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- config binding ---------- */
function bindConfig() {
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const key = el.getAttribute('data-bind');
    if (key === 'TAGLINE_H1') {
      // H1은 마크업(br·accent span)을 유지해야 하므로 BRAND만 치환
      return;
    }
    if (CONFIG[key] !== undefined) el.textContent = CONFIG[key];
  });
  document.querySelectorAll('[data-bind-href]').forEach((el) => {
    const key = el.getAttribute('data-bind-href');
    if (key === 'CONTACT_EMAIL') el.setAttribute('href', 'mailto:' + CONFIG.CONTACT_EMAIL);
  });
  document.title = `${CONFIG.BRAND} ${CONFIG.BRAND_EN} — 제조 AX 온톨로지의 시작 | Joshua & Company`;
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------- trust strip (조건부 로고) ---------- */
function renderTrustStrip() {
  if (!CONFIG.SHOW_CLIENT_LOGOS || CONFIG.CLIENT_LOGOS.length === 0) return;
  const strip = document.getElementById('trust-strip');
  if (!strip) return;
  strip.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'logo-row';
  CONFIG.CLIENT_LOGOS.forEach(({ name, src }) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.loading = 'lazy';
    img.height = 28;
    row.appendChild(img);
  });
  strip.appendChild(row);
}

/* ---------- Meta Pixel ---------- */
function initPixel() {
  if (!CONFIG.PIXEL_ID) return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', CONFIG.PIXEL_ID);
  window.fbq('track', 'PageView');
}
function trackLead() {
  if (CONFIG.PIXEL_ID && typeof window.fbq === 'function') window.fbq('track', 'Lead');
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- product tour player ---------- */
function initTourPlayer() {
  const player = document.getElementById('tour-player');
  if (!player) return;
  const tabs = Array.from(player.querySelectorAll('.tour-tab'));
  const panes = Array.from(player.querySelectorAll('.tour-pane'));
  const INTERVAL = 7000;
  player.style.setProperty('--tour-interval', INTERVAL + 'ms');
  let idx = 0;
  let timer = null;
  let autoplay = !prefersReducedMotion;

  function select(i, byUser) {
    idx = i;
    tabs.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle('active', on);
      t.classList.toggle('autoplaying', on && autoplay);
      t.setAttribute('aria-selected', String(on));
    });
    panes.forEach((p, k) => {
      p.classList.toggle('active', k === i);
      p.hidden = k !== i;
    });
    if (byUser) stopAutoplay();
    else if (autoplay) {
      // 진행바 애니메이션 재시작
      const t = tabs[i];
      t.classList.remove('autoplaying');
      void t.offsetWidth;
      t.classList.add('autoplaying');
    }
  }

  function stopAutoplay() {
    autoplay = false;
    if (timer) { clearInterval(timer); timer = null; }
    tabs.forEach((t) => t.classList.remove('autoplaying'));
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => select(i, true)));

  if (autoplay) {
    // 뷰포트에 들어온 뒤 자동재생 시작
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && autoplay && !timer) {
              select(idx, false);
              timer = setInterval(() => select((idx + 1) % tabs.length, false), INTERVAL);
            } else if (!e.isIntersecting && timer) {
              clearInterval(timer); timer = null;
            }
          });
        }, { threshold: 0.35 })
      : null;
    if (io) io.observe(player);
    else timer = setInterval(() => select((idx + 1) % tabs.length, false), INTERVAL);
  }
}

/* ---------- ask typewriter ---------- */
function initAskTyper() {
  const el = document.getElementById('ask-typer');
  if (!el || prefersReducedMotion) return;
  const questions = [
    '지난주 2라인 불량이 왜 늘었어?',
    '이 자재 로트가 들어간 다른 작업도 있어?',
    'MC04 공구는 다음에 언제 갈아야 해?',
    '이번 달 납기 위험한 주문 있어?',
  ];
  let qi = 0, ci = 0, deleting = false;
  function tick() {
    const q = questions[qi];
    if (!deleting) {
      ci++;
      el.textContent = q.slice(0, ci);
      if (ci === q.length) { deleting = true; return setTimeout(tick, 2200); }
      return setTimeout(tick, 55 + Math.random() * 45);
    }
    ci -= 2;
    if (ci <= 0) {
      ci = 0; deleting = false; qi = (qi + 1) % questions.length;
      el.textContent = '';
      return setTimeout(tick, 500);
    }
    el.textContent = q.slice(0, ci);
    return setTimeout(tick, 18);
  }
  setTimeout(tick, 1200);
}

/* ---------- nav scroll state + sticky CTA ---------- */
function initScrollUI() {
  const nav = document.getElementById('nav');
  const sticky = document.getElementById('sticky-cta');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
    if (sticky) {
      const half = window.scrollY > document.body.scrollHeight * 0.35;
      const nearForm = document.getElementById('lead').getBoundingClientRect().top < window.innerHeight;
      const show = half && !nearForm;
      sticky.classList.toggle('visible', show);
      sticky.setAttribute('aria-hidden', String(!show));
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- count-up ---------- */
function initCountUp() {
  const els = document.querySelectorAll('.countup');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => { el.textContent = el.dataset.target; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const target = Number(e.target.dataset.target);
      const dur = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        e.target.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

/* ---------- knowledge-graph canvas (vanilla, 60fps) ---------- */
function initGraph() {
  const canvas = document.getElementById('graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, nodes = [], raf = null;
  const pointer = { x: -9999, y: -9999 };
  const ACCENT = '169,124,80';   // bronze on light canvas
  const DIMTXT = '120,113,105';  // warm stone ink
  const LINK_DIST = 150;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * DPR; canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const count = Math.min(90, Math.floor((w * h) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 2.2,
      hub: Math.random() < 0.14,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      // pointer attraction (미세하게)
      const dx = pointer.x - n.x, dy = pointer.y - n.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 32000 && d2 > 1) {
        const f = 0.012 / Math.sqrt(d2);
        n.x += dx * f * 14; n.y += dy * f * 14;
      }
    }
    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.28;
          ctx.strokeStyle = `rgba(${a.hub || b.hub ? ACCENT : DIMTXT},${alpha})`;
          ctx.lineWidth = a.hub || b.hub ? 0.9 : 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // nodes
    for (const n of nodes) {
      if (n.hub) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        g.addColorStop(0, `rgba(${ACCENT},0.5)`);
        g.addColorStop(1, `rgba(${ACCENT},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = n.hub ? `rgba(${ACCENT},0.95)` : `rgba(${DIMTXT},0.55)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  function drawStatic() {
    // reduced-motion: 정지된 그래프 1프레임만
    ctx.clearRect(0, 0, w, h);
    raf = null;
    frameOnce();
  }
  function frameOnce() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(${DIMTXT},${(1 - dist / LINK_DIST) * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = n.hub ? `rgba(${ACCENT},0.9)` : `rgba(${DIMTXT},0.5)`;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', () => {
    resize();
    if (prefersReducedMotion) drawStatic();
  }, { passive: true });

  if (prefersReducedMotion) {
    drawStatic();
  } else {
    canvas.parentElement.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }, { passive: true });
    canvas.parentElement.addEventListener('pointerleave', () => {
      pointer.x = -9999; pointer.y = -9999;
    }, { passive: true });
    // 탭 비활성 시 정지
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
      else if (!raf) raf = requestAnimationFrame(frame);
    });
    raf = requestAnimationFrame(frame);
  }
}

/* ---------- UTM capture ---------- */
function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  if (Object.keys(utm).length) {
    try { sessionStorage.setItem('talos_utm', JSON.stringify(utm)); } catch (_) {}
  }
  try { return JSON.parse(sessionStorage.getItem('talos_utm') || '{}'); } catch (_) { return {}; }
}

/* ---------- lead form ---------- */
function initForm() {
  const form = document.getElementById('lead-form');
  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('form-msg');
  if (!form) return;
  let lastSubmit = 0;

  const setMsg = (text, ok) => {
    msg.textContent = text;
    msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 3초 디바운스
    const now = Date.now();
    if (now - lastSubmit < 3000) return;
    lastSubmit = now;

    const fd = new FormData(form);
    const data = {
      company: String(fd.get('company') || '').trim(),
      name: String(fd.get('name') || '').trim(),
      title: String(fd.get('title') || '').trim(),
      phone: String(fd.get('phone') || '').replace(/[^0-9]/g, ''),
      email: String(fd.get('email') || '').trim(),
      pain_point: String(fd.get('pain_point') || '').trim(),
      consent: fd.get('consent') === 'on',
      website: String(fd.get('website') || ''), // honeypot
      source: 'talos-landing',
      utm: captureUtm(),
    };

    // honeypot: 봇이면 조용히 성공 처리
    if (data.website) {
      setMsg('신청 완료! 영업일 1일 내 연락드리겠습니다.', true);
      form.reset();
      return;
    }

    // 클라이언트 검증
    form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
    const fail = (sel, text) => {
      const el = form.querySelector(sel);
      if (el) { el.classList.add('invalid'); el.focus(); }
      setMsg(text, false);
    };
    if (!data.company) return fail('[name=company]', '회사명을 입력해주세요.');
    if (!data.name) return fail('[name=name]', '성함을 입력해주세요.');
    if (!/^0\d{8,10}$/.test(data.phone)) return fail('[name=phone]', '휴대폰 번호를 - 없이 숫자만 입력해주세요.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return fail('[name=email]', '이메일 형식이 올바르지 않습니다.');
    if (!data.consent) return fail('[name=consent]', '개인정보 수집·이용에 동의해주세요.');

    btn.disabled = true;
    btn.textContent = '전송 중…';
    setMsg('', true);

    try {
      const res = await fetch(CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || '전송에 실패했습니다.');
      setMsg('신청 완료! 영업일 1일 내 연락드리겠습니다.', true);
      btn.textContent = '신청 완료';
      form.querySelectorAll('input, textarea').forEach((el) => { el.disabled = true; });
      trackLead();
    } catch (err) {
      btn.disabled = false;
      btn.textContent = '무료 진단 신청하기';
      const reason = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setMsg(`${reason} 잠시 후 다시 시도하시거나, ${CONFIG.CONTACT_EMAIL}로 직접 메일 주세요.`, false);
      msg.insertAdjacentHTML(
        'beforeend',
        ` <a href="mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent('[' + CONFIG.BRAND_EN + '] 무료 AX 진단 신청')}" style="text-decoration:underline">메일로 신청하기</a>`
      );
    }
  });
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  bindConfig();
  renderTrustStrip();
  initPixel();
  initReveal();
  initTourPlayer();
  initAskTyper();
  initScrollUI();
  initCountUp();
  initGraph();
  initForm();
});
