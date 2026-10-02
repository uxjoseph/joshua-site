#!/usr/bin/env bash
# 교육 페이지 일러스트 5장을 Codex(GPT Image)로 만들고 public/edu/*.webp 로 넣는다.
# 선행: `codex login` 이 유효해야 한다. 페이지는 파일이 생기면 자동으로 그림을 그린다.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/edu
TMP=$(mktemp -d)
mkdir -p "$OUT"

STYLE="Match the reference image's style exactly: a frosted translucent milky-white glass 3D object with pale icy-blue edges, soft refraction and rim highlights, on a perfectly flat plain light gray background (#f6f6f6), centered with generous empty margin, very faint soft shadow. No text, letters, numbers or logos anywhere. Landscape 3:2."
REF="$PWD/public/journey-learn.webp"

gen() {
  (cd "$TMP" && codex exec --skip-git-repo-check -s workspace-write \
    "Generate an image using your image generation tool, using $REF as the style reference. Subject: $2 $STYLE Save it as $1.png in the current directory." \
    </dev/null >"$1.log" 2>&1) &
}

gen track-member "an open laptop made of frosted glass, with a small four-point sparkle star and a tiny glass gear floating just above the screen."
gen track-lead "a frosted glass clipboard with three short raised checklist bars, and beside it three small glass spheres connected by thin glass rods like a tiny team network."
gen track-exec "a round frosted glass compass lying slightly tilted with a slim glass needle, and a small glass upward arrow beside it."
gen track-office "two overlapping frosted glass speech bubbles, one larger and one smaller, with a small glass calendar card standing behind them."
gen diagnosis "five frosted glass blocks rising like a staircase from left to right, each taller than the previous, with a small softly glowing blue glass sphere on the top step."
wait

for n in track-member track-lead track-exec track-office diagnosis; do
  if [ -f "$TMP/$n.png" ]; then
    # 바탕을 카드 면(--canvas-soft #f8f8f8)에 정확히 맞춘다 — 모서리 평균을 248 로 평행 이동
    python3 - "$TMP/$n.png" "$OUT/$n.webp" <<'PY'
import sys, numpy as np
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((960, 640))
a = np.asarray(im).astype(np.float32); k = 24
bg = np.concatenate([a[:k,:k], a[:k,-k:], a[-k:,:k], a[-k:,-k:]]).reshape(-1, 3).mean(0)
Image.fromarray(np.clip(a + (248 - bg), 0, 255).astype(np.uint8)).save(sys.argv[2], quality=88)
PY
    echo "ok   $OUT/$n.webp"
  else
    echo "FAIL $n (log: $TMP/$n.log)"
  fi
done
