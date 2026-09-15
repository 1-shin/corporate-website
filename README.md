# 株式会社心 コーポレートサイト

静的HTML + Tailwind CSS の1ページ構成。Netlify でホスティングしています。

- 本番: https://1-shin.com/
- Netlify プロジェクト: https://app.netlify.com/projects/1-shin

## 構成

| パス | 内容 |
| --- | --- |
| `index.html` | サイト本体（1ページ構成、アンカーリンクで各セクションへ） |
| `images/` | サイト内で使う画像 |
| `video/top.mp4` | ヒーロー動画 |
| `favicon.ico` | ファビコン |
| `src/input.css` | Tailwind のエントリポイント |
| `tailwind.config.js` | Tailwind の設定（フォント・カラー） |
| `css/style.css` | `src/input.css` からのビルド生成物。コミットする（下記「デプロイ」参照） |
| `netlify.toml` | Netlify のビルド・公開ディレクトリ・レスポンスヘッダ設定 |

## ローカルでの開発

```bash
npm install
npm run dev     # css/style.css を監視ビルド
```

別のターミナルで適当な静的サーバを立てて `index.html` を開きます。

```bash
python3 -m http.server 4173
```

## デプロイ

Netlify がリポジトリ直下をそのまま公開します（設定は `netlify.toml`）。ビルドコマンドは設定していません。
`main` への push で本番へ、Pull Request では Deploy Preview が自動生成されます。

> [!IMPORTANT]
> **`index.html` のクラスを変更したら、コミット前に必ず `npm run build` を実行して `css/style.css` も一緒にコミットしてください。**
> 忘れると新しいクラスがスタイルなしで表示されます。

### なぜビルド成果物をコミットしているか

Netlify の現在のプランでは、Organization 所有のプライベートリポジトリをビルドできません
（`netlify.toml` に `command` を設定するとデプロイが `Unsupported repository type` で失敗します）。
ビルド工程のないデプロイは通るため、`css/style.css` をコミットする運用にしています。

Netlify 上でビルドしたい場合は、次のいずれかが必要です。

- Netlify を Pro プランへアップグレードする
- リポジトリを public にする、または個人アカウントへ移管する

どちらかを実施したら、`netlify.toml` に `command = "npm run build"` を追加し、`.gitignore` に `css/` を戻してください。

## お問い合わせフォーム

[Netlify Forms](https://docs.netlify.com/manage/forms/setup/) を使用しています。

- フォーム名は `contact`。`index.html` の `<form name="contact" data-netlify="true">` を Netlify がデプロイ時に検出します。
- 送信はページ遷移なしの非同期 POST（`fetch('/')`）で、完了メッセージをその場に表示します。
- `netlify-honeypot="_gotcha"` でスパム対策の hidden フィールドを指定しています。
- 受信内容の確認と通知設定: https://app.netlify.com/projects/1-shin/forms

> フォーム名を変えると Netlify 側では別フォーム扱いになり、通知設定を再設定する必要があります。

## 画像

`images/` 配下にあります。旧サイトの Jimdo (`image.jimcdn.com`) から取得したもので、
現在は外部参照は残っていません（Jimdo を解約してもサイトの表示に影響はありません）。

写真・ロゴ類は WebP のみを置いています（jpg / png のフォールバックは廃止）。例外は OGP 画像 `ogp.png` と
ヒーロー動画のポスター `hero-poster.jpg` です。新しい画像を追加するときは `cwebp -q 80 input.jpg -o images/name.webp` で変換してください。
