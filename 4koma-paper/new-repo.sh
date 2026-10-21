#!/usr/bin/env bash
# このツールを、新しい GitHub リポジトリとして公開するための準備をします。
#
#   ./new-repo.sh [出力先フォルダ] [--create [リポジトリ名]]
#
#   出力先フォルダ   省略すると、このフォルダの隣の ../4koma-paper-repo に作ります。
#   --create [名前]  GitHub CLI(gh)で、公開リポジトリの作成 → main へ push →
#                    GitHub Pages の有効化 までを行います(gh でログイン済みであること)。
#                    名前は省略すると 4koma-paper(自分のアカウント)です。
#                    組織に作るときは「組織名/リポジトリ名」と書きます。
#                    例: --create 4koma-paper/4koma-paper.github.io
#                    (組織名.github.io という名前にすると、https://組織名.github.io/ で公開されます)
#
# 何をするか:
#   1. ./build.sh で公開用の index.html を作り直す
#   2. 出力先に index.html / vendor/ / .nojekyll / README.md を置く
#   3. 出力先で git init -b main → 最初のコミットを作る
#   4. (--create のとき) gh でリポジトリを作って push、Pages を有効にする
set -euo pipefail
cd "$(dirname "$0")"

DEST="../4koma-paper-repo"
CREATE=0
REPO_NAME="4koma-paper"
while [ $# -gt 0 ]; do
  case "$1" in
    --create)
      CREATE=1
      if [ -n "${2:-}" ] && [ "${2#-}" = "$2" ]; then REPO_NAME="$2"; shift; fi
      ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) DEST="$1" ;;
  esac
  shift
done

if [ -z "$(git config user.email || true)" ] || [ -z "$(git config user.name || true)" ]; then
  echo "git の user.name / user.email が未設定です。次を実行してから、もう一度お試しください。" >&2
  echo "  git config --global user.name  \"あなたの名前\"" >&2
  echo "  git config --global user.email \"you@example.com\"" >&2
  exit 1
fi

./build.sh >/dev/null
echo "公開用の index.html を作りました。"

if [ -e "$DEST" ] && [ -n "$(ls -A "$DEST" 2>/dev/null)" ]; then
  echo "出力先がすでにあり、空ではありません: $DEST" >&2
  echo "別のフォルダを指定するか、中身を消してから、もう一度実行してください。" >&2
  exit 1
fi
mkdir -p "$DEST"
cp index.html .nojekyll "$DEST"/
cp -R vendor "$DEST"/
cp README.standalone.md "$DEST/README.md"
echo "ファイルを置きました: $DEST"

cd "$DEST"
git init -q -b main
git add -A
git commit -q -m "4コマ論文: 最初の公開用ファイル"
echo "main に最初のコミットを作りました。"

if [ "$CREATE" -eq 1 ]; then
  command -v gh >/dev/null || { echo "gh(GitHub CLI)が見つかりません。下の手順で、手動で作成してください。" >&2; CREATE=0; }
fi
if [ "$CREATE" -eq 1 ]; then
  gh repo create "$REPO_NAME" --public --source . --remote origin --push \
    --description "論文PDFを4コマ・実験結果の数値・表・関連研究にまとめる、ブラウザだけで動くツール"
  if [[ "$REPO_NAME" == */* ]]; then OWNER="${REPO_NAME%%/*}"; NAME="${REPO_NAME##*/}"; else OWNER="$(gh api user --jq .login)"; NAME="$REPO_NAME"; fi
  if [ "$NAME" = "${OWNER}.github.io" ]; then URL="https://${OWNER}.github.io/"; else URL="https://${OWNER}.github.io/${NAME}/"; fi
  gh api -X POST "repos/${OWNER}/${NAME}/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null \
    && echo "GitHub Pages を有効にしました。1〜2分後に ${URL} で開けます。" \
    || echo "Pages の有効化に失敗しました。Settings → Pages で、main・/ (root) を選んでください。"
else
  cat <<EOF

次の手順で、GitHub に公開します。

  1. https://github.com/new を開き、リポジトリ名(例: ${REPO_NAME})・Public で作成します。
     「Add a README」などのチェックは、すべて外してください(空のリポジトリにします)。
  2. 次を実行します(<ユーザー名> は書き換えてください)。
       cd "$(pwd)"
       git remote add origin https://github.com/<ユーザー名>/${REPO_NAME}.git
       git push -u origin main
  3. リポジトリの Settings → Pages で、Source を「Deploy from a branch」、
     Branch を main・/ (root) にして Save します。
  4. 1〜2分後、https://<ユーザー名>.github.io/${REPO_NAME}/ で開けます。
EOF
fi
