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
    python3 -c "from PIL import Image; im=Image.open('$TMP/$n.png').convert('RGB'); im.thumbnail((960,640)); im.save('$OUT/$n.webp', quality=88)"
    echo "ok   $OUT/$n.webp"
  else
    echo "FAIL $n (log: $TMP/$n.log)"
  fi
done
