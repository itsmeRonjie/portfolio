#!/usr/bin/env bash
# Resize app screenshots into lightweight textures for the 3D stage.
#
# The 3D phones sample these as WebGL textures, so the full-resolution PNGs
# (up to 1344x2992, ~16 MB of GPU memory each) are far more than needed.
# Output: 720px-wide JPEGs in public/apps/money-manager/tex/.
#
# macOS only (uses the built-in `sips`). Re-run after replacing a screenshot,
# and keep the list below in sync with `textureSrc` in data/moneyManagerSite.ts.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/apps/money-manager"
OUT="$SRC/tex"
MAX_EDGE=1600 # longest edge in px; a 9:20 screen lands at ~720px wide
QUALITY=84

SCREENS=(
  screen-home-latest
  screen-transactions
  screen-edit-transaction
  screen-plan-overview
  screen-reports-breakdown
  screen-settings
  screen-settings-reminders
  screen-theme
)

if ! command -v sips >/dev/null 2>&1; then
  echo "sips not found: this script needs macOS." >&2
  exit 1
fi

mkdir -p "$OUT"

for name in "${SCREENS[@]}"; do
  input="$SRC/$name.png"
  output="$OUT/$name.jpg"
  if [ ! -f "$input" ]; then
    echo "missing: $input" >&2
    exit 1
  fi
  sips -s format jpeg -s formatOptions "$QUALITY" -Z "$MAX_EDGE" "$input" --out "$output" >/dev/null
  echo "$name.jpg  $(sips -g pixelWidth -g pixelHeight "$output" | awk '/pixel/{printf "%s ", $2}') $(du -k "$output" | cut -f1)KB"
done
