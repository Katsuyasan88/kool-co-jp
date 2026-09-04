# T-059 SmartThanksCorporate 実装自己レビュー（ガチャちょう公式LP・利用規約・法務JSON）

- 作成日: 2026-09-04
- 対象タスク: CapCole `T-059`（version 1.0.2 production認証設定・配布候補確認）のうち、`SmartThanksCorporate` 側の公式LP・導線・法務配信
- 指示書: `docs/GACHACHO_LP_TASK.md`
- ブランチ: `feature/gachacho-privacy-support`（分岐元 `e8ee101`）
- 状態: ローカル実装・検証完了、commit / push 済み。**本番 deploy は未実施**（Codex レビューとユーザーの個別承認待ち）

## 1. 実装範囲

| # | 指示 | 結果 |
|---|---|---|
| 1 | 公式LP `/gachacho` | 新規 `src/pages/Gachacho.tsx`。lazy load。アプリ名「ガチャちょう」をタイトル・本文・運営者欄に明記 |
| 2 | LPデザイン | コーポレートの Navbar / Footer / `.container` / `.section` / `.btn` を維持しつつ、製品部分はアプリ素材の配色（ピンク・紙色・茶系）と丸ゴシックで「手帳＋ガチャガチャ」を表現。紫青グラデーション・均一カード・意味のないピルは使っていない |
| 3 | `/service` からの導線 | 「自社プロダクト開発・R&D」内に、アイコン・名称・公開状況・短い説明・`/gachacho` への内部リンクを持つ製品ブロックを追加。既存の事業問い合わせCTAは維持 |
| 4 | 利用規約ページ `/gachacho/terms` | 新規 `src/pages/GachachoTerms.tsx`。本文は `/gachacho/legal/current.json` を取得して描画（本文をこのリポジトリに複製しない） |
| 4 | `/terms` 後方互換リダイレクト | `src/components/LegacyTermsRedirect.tsx`。クエリ・ハッシュを引き継いで `/gachacho/terms` へ `replace` 遷移。本文は置かない |
| 4 | 法務JSON静的配信 | `public/gachacho/legal/current.json`、`versions/1.0.json`、`versions/1.0.1.json` を CapCole `site/gachacho/legal/` からそのままコピー（バイト単位で同一。本文の書き換えなし） |
| 4 | canonical | `useCanonical` フックで `/gachacho` と `/gachacho/terms` に `<link rel="canonical">` を設定 |
| 4 | sitemap | `/gachacho`、`/gachacho/terms` を追加。`/terms` は追加していない |
| 5 | 画像 | CapCole の App Store 用画像3点とアイコンを WebP へ変換して `public/gachacho/` に配置。元ファイルは未変更 |

### 触っていないもの

- `/privacy` の本文（既存の `Privacy.tsx` 第9項をそのまま維持。公開URLも維持）
- `infrastructure/scripts/deploy.ps1`、AWS（S3 / CloudFront / Route 53）、Google Auth Platform、Firebase、Apple / Google のストア設定
- CapCole リポジトリ（アプリ・backend・仕様書・法務本文）。参照とファイルコピーのみ
- 未追跡の `.claude/`（commit に含めていない）
- 文書版 1.1 の法務文言（作成していない。確定後は `versions/1.1.json` の追加と `current.json` の差し替えで同期する）

## 2. 変更ファイル

### 新規

| ファイル | 役割 |
|---|---|
| `src/pages/Gachacho.tsx` | 公式LP。Hero / 3ステップ / 記録できること / AI注意 / 運営者・問い合わせ・規約 / 最終CTA |
| `src/pages/GachachoTerms.tsx` | 利用規約ページ。JSON取得・読み込み中・失敗時の表示 |
| `src/components/LegacyTermsRedirect.tsx` | `/terms` → `/gachacho/terms` リダイレクト |
| `src/components/LegalBlocks.tsx` | 法務JSONの `sections` を描画（paragraph / bullets / table）。本文中のURL・メールを自動リンク化するだけで文言は加工しない |
| `src/data/gachachoLegal.ts` | 法務JSONの型・スキーマ検証・取得関数・日付整形 |
| `src/hooks/useCanonical.ts` | canonical link の設定 |
| `public/gachacho/icon-512.webp` ほか画像4点 | LP・`/service` 用画像 |
| `public/gachacho/legal/**` | 法務JSON 3点 |
| `docs/GACHACHO_LP_TASK.md` | 指示書（ユーザー作成。そのまま commit） |

### 変更

| ファイル | 変更内容 |
|---|---|
| `src/App.tsx` | `/gachacho`、`/gachacho/terms`、`/terms` のルート追加 |
| `src/pages/Service.tsx` | `services[0].product` を追加し、製品ブロックを描画。既存項目に「Other Projects」見出しを付与 |
| `src/components/Footer.tsx` | Services に「ガチャちょう（iOSアプリ）」、下段に「ガチャちょう利用規約」を追加 |
| `tailwind.config.js` | `gachacho.*` カラートークンと `font-rounded`（Zen Maru Gothic）を追加。生の色値はLP内で使っていない |
| `index.html` | Google Fonts のリンクに Zen Maru Gothic（500/700）を追加。フォントファイルは使用ページでのみ取得される |
| `public/sitemap.xml` | 上記2URLを追加、`/service` の `lastmod` を更新 |

Navbar のメインナビは変更していない（企業サイトの主導線を保つため。フッターと `/service` から到達できる）。

## 3. 設計上の判断

- **規約本文の単一ソース化**: 指示書の「本文を二重管理しない」を満たすため、ページは同じ `current.json` を実行時に取得する。アプリ・JSON・Webページが同一ファイルを参照するので、文書版更新時は JSON 差し替えだけで揃う。取得失敗時は再読み込みと問い合わせ導線を表示する。
- **`/terms` の到達性**: CloudFront は 403/404 を `/index.html`（200）へ返す設定のため（`docs/DEPLOYMENT.md` 4章）、本番の直接アクセスでも SPA が起動してクライアント側で `/gachacho/terms` へ転送される。HTTP 301 ではないため、検索エンジン向けには canonical と sitemap で正規URLを示している。真の 301 が必要なら CloudFront Function の追加が候補（AWS書き込みのため今回は未実施）。
- **Android の表現**: 「Android版は準備中です」とだけ記載し、Google Play へのリンク・バッジ・「配信中」表記は置いていない。
- **motion**: `useReducedMotion` が真のときは位置移動を止めてフェードのみ、時間も短縮。
- **フォント**: `index.css` の `* { font-main }` が子要素へ効くため、丸ゴシックは見出し要素へ直接 `font-rounded` を指定している。

## 4. 検証結果

| 項目 | 結果 |
|---|---|
| `npm run lint` | 成功（警告なし） |
| `npm run build` | 成功。`dist/gachacho/legal/` に JSON 3点、画像4点が出力されることを確認 |
| `git diff --check` | 問題なし |
| `/gachacho` | タイトル `ガチャちょう \| 株式会社SmartThanks`、canonical `https://smartthanks.world/gachacho`。App Store リンク3箇所すべて `https://apps.apple.com/jp/app/id6798359468`。Google Play / Android 配信を示すリンクなし。内部リンク `/company`、`/contact?type=gachacho`、`/gachacho/terms`、`/privacy#gachacho` |
| `/gachacho/terms` | 第1条〜第14条の14見出しを描画。メタ行「文書版 1.0.1 ／ 制定日 2026年8月31日 ／ 最終更新日 2026年9月4日」。canonical `https://smartthanks.world/gachacho/terms` |
| `/terms?x=1#top` 直接アクセス | `/gachacho/terms?x=1#top` へ到達（クエリ・ハッシュ保持）。規約本文が表示される |
| `/gachacho/legal/current.json` | 200 で JSON が返る |
| `/service` | 製品ブロック「App Storeで公開中（iOS）／ガチャちょう／…／公式ページを見る」を描画。CTA「この事業について問い合わせる」維持 |
| `/privacy#gachacho` | 第9項へスクロール（要素上端がヘッダー下 112px に収まる） |
| `/contact?type=gachacho` | 項目が「ガチャちょうの使い方・不具合について」に初期選択 |
| 横スクロール | 320 / 375 / 1280px で `scrollWidth === innerWidth`。横スクロールなし |
| コンソールエラー | なし |

### 視覚確認（スクリーンショット）

`reviews/Claude Code/20260904_T059_screenshots/` に保存。ローカル dev サーバーを headless Chrome（CDP）でフルページ撮影。

| ファイル | 内容 |
|---|---|
| `gachacho_desktop.webp` | LP 1280px |
| `gachacho_mobile.webp` | LP 375px |
| `gachacho_320.webp` | LP 320px |
| `terms_desktop.webp` / `terms_mobile.webp` | 利用規約 1280px / 375px |
| `legacy_terms_redirect.webp` | `/terms?x=1#top` 直接アクセス後の画面（URLは `/gachacho/terms?x=1#top`） |
| `service_desktop.webp` / `service_mobile.webp` | `/service` 1280px / 375px |
| `privacy_gachacho_mobile.webp` | `/privacy#gachacho` 375px |
| `contact_gachacho_mobile.webp` | `/contact?type=gachacho` 375px |

撮影上の注記: headless Chrome では IntersectionObserver と `loading="lazy"` が発火しないため、撮影スクリプト側でスクロール後に未表示要素（`whileInView` 待ち、LPで9要素、`/service` で2要素）を可視化し、画像を eager 読み込みに切り替えてから撮影した。サイト側のコードは変更していない。通常ブラウザではスクロールに応じて表示されることを Browser パネルで確認済み。

## 5. 公開時に変更される S3 オブジェクトと CloudFront

`deploy.ps1` を実行した場合の差分（バケット `kool-co-jp-web`、ディストリビューション `E34UQ9BU9WL7K2`）。

| 区分 | オブジェクト | 備考 |
|---|---|---|
| 追加 | `gachacho/icon-512.webp`、`gachacho/screen-photo-ai.webp`、`gachacho/screen-check-items.webp`、`gachacho/screen-show-together.webp` | `max-age=86400` |
| 追加 | `gachacho/legal/current.json`、`gachacho/legal/versions/1.0.json`、`gachacho/legal/versions/1.0.1.json` | `max-age=86400`。`aws s3 sync` の拡張子判定で `Content-Type: application/json` になる見込み。公開後に実応答ヘッダーを確認すること |
| 更新 | `index.html`、`sitemap.xml` | フォントリンク追加、sitemap 追加 |
| 更新 | `assets/*` | ハッシュ付きチャンク一式（新規 `Gachacho-*.js`、`GachachoTerms-*.js` を含む）。`--delete` により旧チャンクは削除 |
| Invalidation | `/*` | スクリプト既定 |

追加で必要になり得る AWS 側作業（今回は未実施・要承認）:

- `current.json` に `Access-Control-Allow-Origin: *` を付ける場合は S3 の CORS 設定または CloudFront のレスポンスヘッダーポリシーが必要（CapCole `site/README.md` の要件。未設定でもアプリは同梱版へフォールバックする）。
- `/terms` を HTTP 301 にしたい場合は CloudFront Function の追加。

## 6. Rollback 手順

1. 直前のコミット `e8ee101` を checkout して `.\infrastructure\scripts\deploy.ps1` を実行する（`assets/` と非 assets は `--delete` 付き sync のため、`gachacho/` 配下と新チャンクは削除される）。
2. 部分的に戻す場合: `aws s3 rm s3://kool-co-jp-web/gachacho/ --recursive` の後、`aws cloudfront create-invalidation --distribution-id E34UQ9BU9WL7K2 --paths "/gachacho*" "/terms" "/index.html" "/sitemap.xml"`。
3. 旧 iOS 版が参照する `/terms` は rollback 後も CloudFront の SPA フォールバックにより 404 ページ（React 側）になる。rollback 中は規約URLが表示できないため、実施前に CapCole 側へ連絡する。

## 7. 未解決・確認事項（Codex / ユーザー向け）

1. **`/privacy` の本文と法務JSONの差**: `Privacy.tsx` 第9項は 2026-08-28 時点の独自構成（会社共通ポリシー＋ガチャちょう個別項）で、`current.json` の `privacy` セクション（11項構成）とは文言・構成が異なる。指示書は「公開URLは既存の `/privacy` を維持」「本文を独自に書き換えない」としているため今回は変更していない。CapCole 側の完了条件「`/privacy` と法務JSONが同じ確定本文を配信」を満たすには、`/privacy#gachacho` を JSON 描画へ切り替えるか、JSON側に合わせる判断が必要。
2. **`/terms` はクライアント側リダイレクト**: HTTP 301 ではない。iOS 1.0.1 / build 9 は外部ブラウザで開くため実害はないが、301 が要件なら CloudFront Function を別途承認・実施する。
3. **`versions/1.0.json`** は歴史的版として `https://smartthanks.world/terms` を記載したまま（CapCole 方針どおり上書きしない）。
4. LP の文言（「無料」「1日10回」「カレンダーで月ごと」など）は CapCole の `docs/APP_STORE_SUBMISSIONS.md`、`docs/TERMS_AND_PRIVACY.md`、`docs/PRODUCT_SPEC.md` と照合済み。「Android版は準備中です」の表現可否は確認いただきたい。
5. `og:image` は既存の未作成状態のまま。LP用の OGP 画像は本タスク範囲外。

## 8. 停止位置

commit / push 済み。`deploy.ps1` は実行していない。Codex の差分・表示レビューと、ユーザーのサイト deploy 承認を待つ。公開後の Google ブランディング再申請は別のユーザー操作。
