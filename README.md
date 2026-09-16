# 株式会社心 コーポレートサイト

静的HTML + Tailwind CSS の1ページ構成。Netlify でホスティングしています。

- 本番: https://1-shin.com/
- Netlify プロジェクト: https://app.netlify.com/projects/1-shin

## 構成

| パス | 内容 |
| --- | --- |
| `index.html` | サイト本体・日本語（1ページ構成、アンカーリンクで各セクションへ） |
| `en/index.html` | サイト本体・英語。`index.html` と同じ構造を手で複製している（下記「日本語版と英語版」参照） |
| `privacy.html` / `en/privacy.html` | プライバシーポリシー。**未レビューのたたき台**（下記参照） |
| `images/` | サイト内で使う画像 |
| `video/top.mp4` | ヒーロー動画 |
| `favicon.ico` | ファビコン |
| `src/input.css` | Tailwind のエントリポイント。共通コンポーネント（`.btn` など）もここ |
| `tailwind.config.js` | Tailwind の設定（フォント・カラー） |
| `css/style.css` | `src/input.css` からのビルド生成物。コミットする（下記「デプロイ」参照） |
| `js/main.js` | 全ページ共通のスクリプト（メニュー開閉・フォーム送信・年号） |
| `netlify.toml` | Netlify のビルド・公開ディレクトリ・レスポンスヘッダ設定 |
| `.editorconfig` | インデント・改行コードの共通設定 |

## スタイルの書き方

繰り返し使う意匠は `src/input.css` の `@layer components` にまとめてあります。
HTML 側に同じユーティリティの羅列をコピペせず、まずこれらを使ってください。

| クラス | 用途 |
| --- | --- |
| `.btn` | アウトラインのボタン・リンク。幅を変えたいときは `class="btn px-10"` のように後から上書きする |
| `.chip` / `.chip-etc` | 仕様やサービス項目を並べる四角いタグ。`.chip-etc` は「etc.」用の破線 |
| `.spec-row` | 会社概要の定義リスト1行分 |
| `.process-grid` | PROCESS の5枚組グリッド |
| `.section-sub` | 見出しの中に入れる読み（「COMPANY / 会社概要」） |
| `.field` | フォームの入力欄 |
| `.hero` | ヒーローの高さ（`svh` 非対応環境向けに `vh` のフォールバック付き） |
| `.skip-link` | キーボード操作でナビを読み飛ばすリンク |

セクションのアンカー位置は各要素の `scroll-mt-*` ではなく、`src/input.css` の
`html { scroll-padding-top: var(--header-h) }` で一括指定しています。
**ヘッダーの高さを変えたら `--header-h` も更新してください。**

## ローカルでの開発

```bash
npm install
npm run dev     # css/style.css を監視ビルド
```

別のターミナルで適当な静的サーバを立てて `index.html` を開きます。

```bash
python3 -m http.server 4173
```

## 日本語版と英語版

`index.html` と `en/index.html` はテンプレートを使わず、同じ構造を手で複製しています。
**片方を直したらもう片方も必ず直してください。** クラス名・セクション構成・`id` は
両者で一致している必要があります（`js/main.js` と `css/style.css` を共有しているため）。

英語ページは日本語グリフを持たない `Noto Sans` を読み込み、`<body>` に `font-en` を
当てています。日本語ページの `font-sans`（`Noto Sans JP`）と使い分けてください。

プライバシーポリシー（`privacy.html` / `en/privacy.html`）は一般的な雛形をこのサイトの
実態に合わせて書いた**たたき台**で、法務レビューを受けていません。現在は
`<meta name="robots" content="noindex">` を付けてあります。内容を確認して公開する
タイミングで `noindex` を外してください。

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
- 送信はページ遷移なしの非同期 POST（`fetch('/')`）で、完了メッセージをその場に表示します。処理は `js/main.js`。
- 画面に出す文面（送信中・成功・失敗）は `<form>` の `data-msg-*` 属性に持たせています。日英で文面を変えるときはここを編集してください。
- 入力欄の `id` は `contact-` 接頭辞付きです（`name` 属性はフォームのフィールド名なので変更しないこと）。
- `netlify-honeypot="_gotcha"` でスパム対策の hidden フィールドを指定しています。
- 受信内容の確認と通知設定: https://app.netlify.com/projects/1-shin/forms

> フォーム名を変えると Netlify 側では別フォーム扱いになり、通知設定を再設定する必要があります。

## 画像

`images/` 配下にあります。旧サイトの Jimdo (`image.jimcdn.com`) から取得したもので、
現在は外部参照は残っていません（Jimdo を解約してもサイトの表示に影響はありません）。

写真・ロゴ類は WebP のみを置いています（jpg / png のフォールバックは廃止）。例外は OGP 画像 `ogp.png` と
ヒーロー動画のポスター `hero-poster.jpg` です。新しい画像を追加するときは `cwebp -q 80 input.jpg -o images/name.webp` で変換してください。
