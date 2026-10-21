#!/usr/bin/env bash
# 開発用の ../paper-comic/index.html から、公開用の index.html を作ります。
# 違いは、PDF 読み取りライブラリ(pdf.js)の読み込み先だけです。
#   CDN(cdnjs)  →  このフォルダの vendor/pdfjs/
#
# 使い方:
#   ./build.sh                  index.html を作り直す
#   ./build.sh --fetch-pdfjs    vendor/pdfjs/ に pdf.js 2.16.105 を取得し直してから作り直す(npm が必要)
set -euo pipefail
cd "$(dirname "$0")"

PDFJS_VERSION="2.16.105"
SRC="../paper-comic/index.html"

if [ "${1:-}" = "--fetch-pdfjs" ]; then
  command -v npm >/dev/null || { echo "npm が見つかりません。Node.js を入れてください。" >&2; exit 1; }
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  (cd "$tmp" && npm pack "pdfjs-dist@${PDFJS_VERSION}" --silent >/dev/null && tar xzf "pdfjs-dist-${PDFJS_VERSION}.tgz")
  mkdir -p vendor/pdfjs
  cp "$tmp/package/build/pdf.min.js" "$tmp/package/build/pdf.worker.min.js" "$tmp/package/LICENSE" vendor/pdfjs/
  echo "vendor/pdfjs/ に pdf.js ${PDFJS_VERSION} を取得しました。"
fi

[ -f "$SRC" ] || { echo "元のファイルが見つかりません: $SRC" >&2; exit 1; }
[ -f vendor/pdfjs/pdf.min.js ] && [ -f vendor/pdfjs/pdf.worker.min.js ] || {
  echo "vendor/pdfjs/ がありません。./build.sh --fetch-pdfjs を実行してください。" >&2; exit 1; }

sed \
  -e "s#https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js#vendor/pdfjs/pdf.min.js#" \
  -e "s#https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js#vendor/pdfjs/pdf.worker.min.js#" \
  "$SRC" > index.html

if grep -q "cdnjs.cloudflare.com" index.html; then
  echo "置き換えできていない読み込み先が残っています。${SRC} の pdf.js の指定を確認してください。" >&2
  exit 1
fi
echo "index.html を作りました($(wc -c < index.html) バイト)。"
