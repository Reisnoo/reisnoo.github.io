# 4コマ論文

論文のPDFを入れると、**概要編・結果編の4コマ(計8コマ)**と、**実験結果の数値(本文・図表キャプション・表のセル)**、**関連研究**にまとめる、ブラウザだけで動く静的ページです。複数の論文を入れて、数値を**論文×項目の一覧表**やCSVにまとめることもできます。

- PDFは**端末の中だけ**で読み取ります(アップロードされません)。
- サーバー側の処理や、ビルド用のツールは要りません。`index.html` と `vendor/` があれば動きます。

## 公開する(GitHub Pages)

1. この内容を、GitHub のリポジトリの `main` ブランチに置きます。
2. リポジトリの **Settings → Pages** を開きます。
3. **Build and deployment** の Source を「Deploy from a branch」、Branch を `main`・`/ (root)` にして、Save します。
4. 1〜2分後、次のURLで開けます。

   ```
   https://<ユーザー名>.github.io/<リポジトリ名>/
   ```

GitHub CLI(`gh`)を使う場合は、ここまでをコマンドで行えます。

```bash
gh api -X POST repos/<ユーザー名>/<リポジトリ名>/pages -f 'source[branch]=main' -f 'source[path]=/'
```

## 手元で確認する

```bash
python3 -m http.server 8000
# ブラウザで http://localhost:8000/ を開く
```

ファイルを直接開いても動きますが、PDF読み取りの部品(pdf.js)の都合で、簡易サーバー経由をおすすめします。

## フォルダの中身

| ファイル | 役割 |
|---|---|
| `index.html` | アプリ本体(HTML・CSS・JavaScript が1ファイル) |
| `vendor/pdfjs/` | PDFを読む部品 pdf.js 2.16.105(Apache License 2.0、`LICENSE` を同梱) |
| `.nojekyll` | GitHub Pages が `vendor/` などを加工しないための印 |

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

## 更新するとき

このリポジトリは、`Reisnoo/reisnoo.github.io` の `paper-comic/`(開発用)から生成した公開用のコピーです。アプリを更新したら、元のリポジトリで `4koma-paper/new-repo.sh` を実行して、できたフォルダの内容を、ここに上書きして push します。

## ライセンス・出典

- `vendor/pdfjs/` は [pdf.js](https://github.com/mozilla/pdf.js)(Mozilla)2.16.105 で、Apache License 2.0 です。
- 関連研究のデータは [OpenAlex](https://openalex.org) から取得しています。
- アプリ本体(`index.html`)のライセンスは、まだ決まっていません。公開する際に、必要なら `LICENSE` を追加してください。
