# 4コマ論文(公開用フォルダ)

論文のPDFを入れると、**概要編・結果編の4コマ(計8コマ)**と、**実験結果の数値(本文・図表キャプション・表のセル)**、**関連研究**にまとめる、ブラウザだけで動く静的ページです。複数の論文を入れて、数値を**論文×項目の一覧表**やCSVにまとめることもできます。

このフォルダは、そのまま git で公開できるように、必要なファイルをすべて含んでいます。サーバー側の処理や、ビルド用のツールは要りません。

- 公開先の例: `https://reisnoo.github.io/4koma-paper/`
- PDFは**端末の中だけ**で読み取ります(アップロードされません)。

## 公開する手順(GitHub Pages)

このリポジトリ(`reisnoo.github.io`)は、すでに GitHub Pages のユーザーサイトとして動いています。ブランチの内容が **`main` に入れば**、このフォルダは自動で公開されます。

1. 変更を `main` に取り込みます(プルリクエストを作ってマージするか、手元で次のようにします)。

   ```bash
   git checkout main
   git pull origin main
   git merge claude/peaceful-bohr-6soibe
   git push origin main
   ```

2. 1〜2分待つと、次のURLで開けます。

   ```
   https://<ユーザー名>.github.io/4koma-paper/
   ```

   開けないときは、GitHub のリポジトリの **Settings → Pages** で、公開元(Source)が「Deploy from a branch」・ブランチが `main`・フォルダが `/ (root)` になっているか確認してください。

### このフォルダだけを、新しい別のリポジトリにして公開する場合

`new-repo.sh` が、新しいリポジトリ用のフォルダを作って、`main` に最初のコミットまで行います。

```bash
cd 4koma-paper
./new-repo.sh                        # ../4koma-paper-repo にフォルダを作る(出力先は引数で変えられます)
```

できたフォルダは、GitHub に空のリポジトリを作って push すれば、公開できます(スクリプトの最後に、手順が表示されます)。

```bash
cd ../4koma-paper-repo
git remote add origin https://github.com/<ユーザー名>/4koma-paper.git
git push -u origin main
# そのあと、Settings → Pages で main・/ (root) を選ぶ
```

GitHub CLI(`gh`)にログイン済みなら、リポジトリの作成・push・Pages の有効化まで、1コマンドでできます。

```bash
./new-repo.sh --create              # 公開リポジトリ「4koma-paper」を作成して公開
./new-repo.sh --create my-name      # リポジトリ名を変える場合
```

新しいリポジトリの `README.md` は、`README.standalone.md` から作られます。

#### GitHub の組織(Organization)で公開する場合

組織名と同じ `<組織名>.github.io` という名前のリポジトリは、`https://<組織名>.github.io/` で公開されます(例: 組織「4koma-paper」→ `https://4koma-paper.github.io/`)。

- すでにあるリポジトリを組織に移す場合: そのリポジトリの **Settings → General → Danger Zone → Transfer ownership** で、組織に転送します。そのあと **Repository name** を `<組織名>.github.io` に変えて、Settings → Pages で `main`・`/ (root)` を選びます。履歴は、そのまま残ります。
- 新しく作る場合(`gh` が使えるとき):

  ```bash
  ./new-repo.sh --create 4koma-paper/4koma-paper.github.io
  ```

> このリポジトリ(`reisnoo.github.io`)の `4koma-paper/` と、新しい別のリポジトリでは、公開URLが同じ名前(`.../4koma-paper/`)になることがあります。両方を公開する場合は、リポジトリ名を変えてください。

## 手元で確認する

`index.html` はファイルを直接開いても動きますが、PDF読み取りの部品(pdf.js)の都合で、**簡易サーバー経由**をおすすめします。

```bash
cd 4koma-paper
python3 -m http.server 8000
# ブラウザで http://localhost:8000/ を開く
```

## フォルダの中身

| ファイル | 役割 |
|---|---|
| `index.html` | アプリ本体(HTML・CSS・JavaScript が1ファイル) |
| `vendor/pdfjs/pdf.min.js` | PDFを読む部品 pdf.js 2.16.105 |
| `vendor/pdfjs/pdf.worker.min.js` | 同上(バックグラウンド処理) |
| `vendor/pdfjs/LICENSE` | pdf.js のライセンス(Apache License 2.0) |
| `.nojekyll` | GitHub Pages が `vendor/` などを加工しないための印 |
| `build.sh` | 開発用ファイルから `index.html` を作り直すスクリプト |
| `new-repo.sh` | 新しい別のリポジトリ用のフォルダを作るスクリプト |
| `README.standalone.md` | 新しいリポジトリの `README.md` のひな形 |

## 更新するとき

アプリ本体の元ファイルは `../paper-comic/index.html` です。そこを編集したあと、次を実行すると、公開用の `index.html` が作り直されます。

```bash
cd 4koma-paper
./build.sh                  # index.html を作り直す
./build.sh --fetch-pdfjs    # pdf.js を取得し直してから作り直す(npm が必要)
```

作り直すと、`index.html` の中の pdf.js の読み込み先が、CDN(cdnjs)から `vendor/pdfjs/` に置き換わります。ほかは同じです。

## 外部との通信

アプリが外に出る通信は、次の2つだけです。どちらも使わなければ、通信は発生しません。

| 通信先 | いつ | 送る内容 |
|---|---|---|
| `api.openalex.org`(OpenAlex) | 論文を1本解析した直後に、関連研究を探すとき | 論文のタイトル、DOI、またはキーワード(PDFは送りません) |
| `api.anthropic.com` | 右上の「AI設定」をオンにしたときだけ | 抽出した本文(最大約12,000字)と、入力したAPIキー |

APIキーは、このブラウザのタブの中にだけ置かれます(保存は、チェックを入れたときだけ)。

## 使うときの注意

- 4コマの文、数値、表の読み取りは、**文字の位置や言い回しから機械的に取り出したもの**です。重要な点は、必ず「論文のどこ?」や元の表で、原文を確認してください。
- 画像として入っている表や図、スキャンされたPDFの文字は、読み取れません。
- 論文×項目の一覧表は、**同じ名前の項目だけ**を同じ列にそろえます。名前が違えば別の列になります。

## ライセンス・出典

- `vendor/pdfjs/` は [pdf.js](https://github.com/mozilla/pdf.js)(Mozilla)2.16.105 で、Apache License 2.0 です。ライセンス全文は `vendor/pdfjs/LICENSE` にあります。
- 関連研究のデータは [OpenAlex](https://openalex.org) から取得しています。
