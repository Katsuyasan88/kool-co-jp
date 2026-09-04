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
| 2 | LPデザイン | コーポレートの Navbar / Footer / `.container` / `.section` / `.btn` を維持しつつ、製品部分はアプリ素材の配色（ピンク・紙色・茶系）と丸ゴシックで「手帳＋ガチャ」を表現。紫青グラデーション・均一カード・意味のないピルは使っていない |
| 3 | `/service` からの導線 | 「自社プロダクト開発・R&D」内に、アイコン・名称・公開状況・短い説明・`/gachacho` への内部リンクを持つ製品ブロックを追加。既存の事業問い合わせCTAは維持 |
| 4 | 利用規約ページ `/gachacho/terms` | 新規 `src/pages/GachachoTerms.tsx`。本文は `/gachacho/legal/current.json` を取得して描画（本文をこのリポジトリに複製しない） |
| 4 | `/terms` 後方互換リダイレクト | `src/components/LegacyTermsRedirect.tsx`。クエリ・ハッシュを引き継いで `/gachacho/terms` へ `replace` 遷移。本文は置かない |
| 4 | 法務JSON静的配信 | `public/gachacho/legal/current.json`、`versions/1.0.json`、`versions/1.0.1.json` を CapCole `site/gachacho/legal/` からそのままコピー（バイト単位で同一。本文の書き換えなし） |
| 4 | canonical | `useCanonical` フックで `/gachacho` と `/gachacho/terms` に `<link rel="canonical">` を設定 |
| 4 | sitemap | `/gachacho`、`/gachacho/terms` を追加。`/terms` は追加していない |
| 5 | 画像 | ユーザー提供の App Store 掲載画像 version 1.0.1（`gacha-cho_1.0.1_page1〜3.png`、1242×2688）を 720px 幅の WebP へ変換して `public/gachacho/store-0*.webp` に配置。アイコンは CapCole `design/derived/app-icon/icon.png` から変換。元ファイルは未変更 |
| 1 | App Store 導線 | Apple 公式バッジ（JP / Black lockup / SVG `Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg`）を `public/gachacho/app-store-badge-jp.svg` に無改変で配置し、Hero と最終CTAの2箇所で使用。高さ 48px（モバイル）/ 60px（デスクトップ）、リンク要素の内側余白で周囲の余白を確保 |

### 触っていないもの

- `/privacy` の会社共通ポリシー本文（第1〜8項）と公開URL。第9項（ガチャちょう）は 9章の Codex 指摘対応で法務JSON描画へ切り替えた
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
| `public/gachacho/icon-512.webp`、`store-01-capture.webp`、`store-02-ai-collection.webp`、`store-03-show-together.webp` | LP・`/service` 用画像 |
| `public/gachacho/app-store-badge-jp.svg` | Apple 公式 App Store バッジ（JP・黒） |
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
| `npm run build` | 成功。`dist/gachacho/legal/` に JSON 3点、`dist/gachacho/` に画像4点とバッジSVGが出力されることを確認 |
| `git diff --check` | 問題なし |
| `/gachacho` | タイトル `ガチャちょう \| 株式会社SmartThanks`、canonical `https://smartthanks.world/gachacho`。App Store リンク3箇所（公式バッジ2箇所＋情報欄のテキストリンク）すべて `https://apps.apple.com/jp/app/id6798359468`。Google Play / Android 配信を示すリンクなし。内部リンク `/company`、`/contact?type=gachacho`、`/gachacho/terms`、`/privacy#gachacho` |
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
| 追加 | `gachacho/icon-512.webp`、`gachacho/store-01-capture.webp`、`gachacho/store-02-ai-collection.webp`、`gachacho/store-03-show-together.webp`、`gachacho/app-store-badge-jp.svg` | `max-age=86400` |
| 追加 | `gachacho/legal/current.json`、`gachacho/legal/versions/1.0.json`、`gachacho/legal/versions/1.0.1.json` | `deploy.ps1` が `--content-type "application/json; charset=utf-8"`、`max-age=3600` で明示アップロード（9章参照）。旧版JSONは削除しない |
| 更新 | `index.html`、`sitemap.xml` | フォントリンク追加、sitemap 追加 |
| 更新 | `assets/*` | ハッシュ付きチャンク一式（新規 `Gachacho-*.js`、`GachachoTerms-*.js` を含む）。`--delete` により旧チャンクは削除。配布順は assets → 一般ファイル → 法務JSON → `index.html` → Invalidation（11章） |
| Invalidation | `/*` | スクリプト既定 |

追加で必要になり得る AWS 側作業（今回は未実施・要承認）:

- `current.json` の `Access-Control-Allow-Origin: *`: 9章のとおり `apply-legal-cors.ps1 -Apply` で CloudFront に `/gachacho/legal/*` 専用ビヘイビアを追加する（未適用。要承認）。
- `/terms` を HTTP 301 にしたい場合は CloudFront Function の追加。

## 6. Rollback 手順（第2回 Codex レビューで訂正）

### 6.1 互換性 floor（初回公開後に守る最低条件）

公開中の iOS version `1.0.1` / build `9` は `https://smartthanks.world/terms` を、以降の版とアプリ内リンクは `/gachacho/terms`・`/privacy`・`/gachacho/legal/current.json` を参照する。初回公開後は、次をすべて満たす版だけを公開してよい。

- 旧 `/terms` → `/gachacho/terms` の後方互換リダイレクトが動く
- `/gachacho/terms` が canonical な規約ページとして本文を表示する
- `/gachacho/legal/current.json` と `versions/*.json` が配信され、S3 の `gachacho/legal/versions/*` を削除しない
- `/privacy`（`#gachacho` を含む）が表示される

このため **`e8ee101` 以前（`/terms`・`/gachacho/terms`・法務JSONを持たない版）への全面 rollback は禁止**する。旧版へ `deploy.ps1` を実行すると `--delete` 付き sync で `gachacho/` 配下と新 chunk が消え、規約URLが 404 になる。

### 6.2 初回公開で問題が出た場合の手順（優先順）

1. **Roll-forward（原則）**: 互換性 floor を保ったまま修正コミットを作り、lint / build / stub テスト後に `deploy.ps1` で公開する。`deploy.ps1` は失敗時に即時停止し、`index.html` を最後に切り替えるため、途中失敗でも公開中の `index.html` は旧 chunk を参照し続ける。
2. **互換性を保つ rollback 成果物へ戻す**: 公開時に公開コミットへ git tag（例: `deploy/20260904-t059`）を付けておき、問題が出た版より前で **floor を満たす** タグへ checkout して `deploy.ps1` を実行する。T-059 初回公開では floor を満たす最古の版が初回公開コミット自身なので、初回公開に対しては 1 の roll-forward しか選べない。
3. S3 の `gachacho/legal/versions/*` はどの手順でも削除しない（`deploy.ps1` は `gachacho/legal/*` を `--delete` 対象から除外している）。手動で `aws s3 rm` しない。

### 6.3 CORS 設定だけを戻す場合（上記とは別）

`apply-legal-cors.ps1 -Remove` で CloudFront の `/gachacho/legal/*` ビヘイビアだけを削除する（`docs/DEPLOYMENT.md` 5.4）。サイト本体・S3 オブジェクト・法務JSONには影響しない。戻すと cross-origin GET の `Access-Control-Allow-Origin` が付かなくなるが、アプリは同梱版へフォールバックするため規約URL自体は壊れない。

### 6.4 やってはいけないこと

- `e8ee101` 以前への checkout + `deploy.ps1`
- `aws s3 rm s3://kool-co-jp-web/gachacho/ --recursive` などの `gachacho/` 配下一括削除
- `index.html` だけ先に差し替える手動アップロード（未配置 chunk を参照する）

## 7. 未解決・確認事項（Codex / ユーザー向け）

1. ~~`/privacy` の本文と法務JSONの差~~: Codex 指摘1として 9章で対応済み（`/privacy#gachacho` を法務JSON描画へ切り替え）。
2. **`/terms` はクライアント側リダイレクト**: HTTP 301 ではない。iOS 1.0.1 / build 9 は外部ブラウザで開くため実害はないが、301 が要件なら CloudFront Function を別途承認・実施する。
3. **`versions/1.0.json`** は歴史的版として `https://smartthanks.world/terms` を記載したまま（CapCole 方針どおり上書きしない）。
4. LP の文言（「無料」「1日10回」「カレンダーで月ごと」など）は CapCole の `docs/APP_STORE_SUBMISSIONS.md`、`docs/TERMS_AND_PRIVACY.md`、`docs/PRODUCT_SPEC.md` と照合済み。「Android版は準備中です」の表現可否は確認いただきたい。
5. `og:image` は既存の未作成状態のまま。LP用の OGP 画像は本タスク範囲外。

## 8. 追記（2026-09-04 2回目）

ユーザー指示により次を差し替えた。lint / build / `git diff --check` 再実行済み、LPのスクリーンショット3点（desktop / mobile / 320）を更新。

- LP内のアプリ画像を、ユーザー提供の App Store 掲載画像 version 1.0.1（3ページ）へ置き換え。画像に焼き込まれた見出し（「撮るだけかんたん」「AI自動解析でかんたんコレクション」「シール帳みたいに見せ合おう」）に合わせて3ステップの文言を調整した（02 を「AIが読み取り、確認して保存」とし、保存前の確認・修正を明記）。
- App Store 導線を独自ボタンから Apple 公式バッジ（JP / Black lockup / SVG）へ変更。バッジは無改変、最小高さ 40px 以上を確保。
- 旧画像 `screen-*.webp` 3点は削除。

## 9. Codex レビュー（`reviews/Codex/20260904_T059_review.md`）への対応（2026-09-04 3回目）

### 指摘1: `/privacy#gachacho` を CapCole の確定本文へ同期

- `src/pages/Privacy.tsx` の `id="gachacho"` 内の独自本文（旧 9.1〜9.8）を削除し、`/gachacho/legal/current.json` の `privacy.lead` と `privacy.sections` を描画するよう変更した。会社共通ポリシー（第1〜8項）と見出し「9. ガチャちょうに関する個別の取扱い」は維持。
- 取得・検証処理は新設の `src/hooks/useGachachoLegal.ts` に集約し、`/gachacho/terms`（`GachachoTerms.tsx`）も同じフックを使う。`fetchGachachoLegal` のスキーマ検証はそのまま。
- `LegalBlocks` に `headingLevel` prop を追加し、`/privacy` 内では h3、単独ページでは h2 で描画。文言の加工はしない（URL・メールのリンク化のみ）。
- 文書版・制定日・最終更新日のメタ行と、機械可読版（`current.json` / `versions/{version}.json`）へのリンクを表示。
- 取得失敗時: 「ガチャちょうのプライバシーポリシーを読み込めませんでした。」の表示、再読み込みボタン、`/contact?type=gachacho-privacy` とメールの導線（`role="alert"`）。読み込み中はスケルトンと `aria-live`。
- `Privacy.tsx` にガチャちょうの本文文字列は残っていない（`grep "Firebase Authentication"` 等で確認）。

### 指摘2: 法務JSONの CORS を公開手順で保証

**読み取り確認（AWS への書き込みなし）**:

| 確認 | コマンド | 結果 |
|---|---|---|
| S3 CORS | `aws s3api get-bucket-cors --bucket kool-co-jp-web` | `NoSuchCORSConfiguration`（未設定） |
| CloudFront 既定ビヘイビア | `aws cloudfront get-distribution-config --id E34UQ9BU9WL7K2` | レガシー `ForwardedValues`（ヘッダー転送 0 件）、`ResponseHeadersPolicyId` なし、`CacheBehaviors` 0 件、`CustomErrorResponses` 403/404 → `/index.html` 200 |
| 本番の現応答 | `curl -sI -H "Origin: https://example.com" https://smartthanks.world/sitemap.xml` | `Access-Control-Allow-Origin` なし |

結論: **現状の AWS 設定では CORS ヘッダーは保証されていない**。S3 に CORS を足しても CloudFront が `Origin` を転送しないため効かない。

**用意した冪等な設定案（未適用）**:

| ファイル | 内容 |
|---|---|
| `infrastructure/cloudfront/legal-json-cache-behavior.json` | `/gachacho/legal/*` 専用のキャッシュビヘイビア定義。`Managed-SimpleCORS`（`60669652-455b-4ae9-85a4-c4c02393f86c`）で `Access-Control-Allow-Origin: *` を付与、`Managed-CachingOptimized`（`658327ea-...`）、GET/HEAD、redirect-to-https、compress |
| `infrastructure/scripts/apply-legal-cors.ps1` | 引数なし: 読み取りと差分表示のみ。`-Apply`: 同名 PathPattern がなければ追加、内容が同じなら変更なしで終了（冪等）。`-Remove`: 削除（rollback）。適用前設定を `infrastructure/cloudfront/backups/`（.gitignore 済み）へ保存し、`--if-match` で ETag 競合を防ぐ |
| `infrastructure/scripts/deploy.ps1` | `gachacho/legal/*` を sync から除外し、`--content-type "application/json; charset=utf-8" --cache-control "max-age=3600"` で明示アップロード。旧版JSONは削除しない |
| `docs/DEPLOYMENT.md` 5章 | 現状・保証方法・適用手順・公開後確認の期待値・rollback |

影響範囲: `/gachacho/legal/*` のみ。既定ビヘイビア、SPA フォールバック、他パスは変更しない。

ドライラン実行結果（読み取りのみ）: `apply-legal-cors.ps1` を引数なしで実行し、`CacheBehaviors` 0 件 → 1 件（`/gachacho/legal/*`）の差分表示と「ドライランです」で終了することを確認。`update-distribution` は呼ばれていない。

**公開後確認（第三者が判定できる期待値）**:

```bash
curl -sI -H "Origin: https://example.com" https://smartthanks.world/gachacho/legal/current.json
```

- `200`、`Content-Type: application/json; charset=utf-8`、`Access-Control-Allow-Origin: *`
- `Managed-SimpleCORS` は `Origin` ヘッダーのある要求にだけ CORS ヘッダーを付けるため、`Origin` なしで付かないのは正常
- `curl -s .../current.json | python -c "import sys,json;print(json.load(sys.stdin)['documentVersion'])"` が `1.0.1`

**Rollback**: `.\infrastructure\scripts\apply-legal-cors.ps1 -Remove`、または `backups/` の保存ファイルから復元。

### 再検証結果

| 項目 | 結果 |
|---|---|
| `npm run lint` / `npm run build` / `git diff --check` | すべて成功 |
| JSON 同一性 | `public/gachacho/legal/` の 3 点が CapCole `site/gachacho/legal/` と SHA-256 一致（`current.json` = `versions/1.0.1.json` = `7530473e…`、`versions/1.0.json` = `5dfecdfe…`） |
| `/privacy#gachacho` 本文 | h3 見出し 11 件（「1. 取得・取り扱う情報」〜「11. お問い合わせ」）、表 1、箇条書き 6、lead 段落、メタ行「文書版 1.0.1 ／ 制定日 2026年8月31日 ／ 最終更新日 2026年9月4日」。旧本文「9.1 対象サービス」は存在しない |
| `/privacy#gachacho` アンカー | 直接アクセスで第9項へスクロール（要素上端 112px、ヘッダー下） |
| `/privacy#gachacho` 取得失敗表示 | `/gachacho/legal/*` をブロックして確認。エラー文・再読み込み・問い合わせ導線を表示（`privacy_gachacho_error_mobile.webp`）。`/gachacho/terms` の失敗表示も同様に確認（`terms_error_mobile.webp`） |
| 主要幅 | 375 / 1280px で横スクロールなし。`privacy_gachacho_mobile.webp` / `privacy_gachacho_desktop.webp` を更新 |
| 旧 `/terms` | `/terms?x=1#top` → `/gachacho/terms?x=1#top`、h2 14 件を描画 |
| `/gachacho` | 影響なし（App Store リンク 3 箇所、横スクロールなし、コンソールエラーなし） |

### 未適用のまま残しているもの（要承認）

- `apply-legal-cors.ps1 -Apply`（CloudFront 更新）
- `deploy.ps1`（S3 同期・Invalidation）
- 上記 2 つは同じ公開単位で実施し、公開後確認を `docs/DEPLOYMENT.md` 5.3 の手順で行う

## 10. 表記の統一（2026-09-04 4回目）

ユーザー指示により、「ガチャガチャ」は登録商標のため LP 内の表現を「ガチャ」へ統一した（`src/pages/Gachacho.tsx` の Hero 見出しとステップ 01 本文の 2 箇所）。法務 JSON・利用規約・プライバシー本文には当該表記は含まれておらず変更なし。`grep` で `src/`・`public/`・`index.html` に「ガチャガチャ」が残っていないことを確認。lint / build / `git diff --check` 成功。

## 11. Codex 第2回レビューへの対応（2026-09-04 5回目）

対象: `reviews/Codex/20260904_T059_review.md` 「第2回レビュー」指摘1・2。LP・privacy 本文・CapCole リポジトリは変更していない。

### 指摘1: `deploy.ps1` の部分失敗を成功扱いしない

`infrastructure/scripts/deploy.ps1` を書き直した。

- `Invoke-Step` で build と各 AWS CLI 呼び出しの終了コードを確認し、0 以外なら `FAILED: <ステップ名>` を表示して `exit 1`。以降の処理と `Deployment complete!` へ進まない。`$ErrorActionPreference = 'Stop'`。
- 配布順を「`assets/`（`--delete`）→ 画像・sitemap 等の一般ファイル（`index.html` と `gachacho/legal/*` を除外、`--delete`）→ 法務JSON（`application/json; charset=utf-8`、`--delete` なし）→ `index.html`（切替点、no-cache）→ Invalidation `/*`」に変更。公開中の `index.html` が未配置の chunk / JSON を参照する時間をつくらない。
- build 後に `dist/index.html` の存在を確認してから同期する。
- S3 の `gachacho/legal/versions/*` は `--delete` 対象外のまま。

**副作用なし検証**: `infrastructure/scripts/tests/deploy.stubtest.ps1` を追加。PATH 先頭に置いた `aws.cmd` stub が全呼び出しを記録し、`STUB_FAIL_MATCH` に一致する呼び出しだけ `exit 1` を返す。`npm run build` は実行されるが AWS への書き込みは発生しない。実行結果（24 アサーション、すべて PASS）:

```
Case 1: all succeed
  PASS  exit code 0 (actual 0)
  PASS  aws called 5 times (actual 5)
  PASS  call 1 is 's3 sync'
  PASS  call 2 is 's3 sync'
  PASS  call 3 is 's3 cp'
  PASS  call 4 is 's3 cp'
  PASS  call 5 is 'cloudfront create-invalidation'
  PASS  legal JSON uploaded with explicit Content-Type before index.html
  PASS  index.html is uploaded after assets, static files and legal JSON
  PASS  legal JSON is never synced with --delete (only excluded from sync)
  PASS  success message shown
Case 2: legal JSON upload fails
  PASS  exit code 1 (actual 1)
  PASS  stops after 3rd aws call (actual 3)
  PASS  index.html is NOT uploaded
  PASS  invalidation is NOT created
  PASS  no success message
  PASS  failure names the step
Case 3: assets sync fails
  PASS  exit code 1 (actual 1)
  PASS  stops after 1st aws call (actual 1)
  PASS  no success message
Case 4: invalidation fails
  PASS  exit code 1 (actual 1)
  PASS  all 5 aws calls attempted (actual 5)
  PASS  no success message
ALL PASSED
```

- ケース1（全成功）: aws 呼び出し 5 回、順序 `s3 sync`(assets) → `s3 sync`(static) → `s3 cp`(legal JSON, Content-Type 明示) → `s3 cp`(index.html) → `create-invalidation`。法務JSONを `--delete` 付き sync していない。成功表示あり。
- ケース2（法務JSON upload 失敗）: 3 回目で停止、`index.html` と Invalidation は呼ばれない、成功表示なし、exit 1、`FAILED: Upload legal JSON` を表示。
- ケース3（assets sync 失敗）: 1 回目で停止、exit 1。
- ケース4（Invalidation 失敗）: exit 1、成功表示なし。

### 指摘2: 旧 iOS 導線を壊す rollback を完了手順にしない

- 本 md の 6 章を全面訂正した。互換性 floor（旧 `/terms` リダイレクト、`/gachacho/terms`、法務JSON、`/privacy`）を明記し、**`e8ee101` 以前への全面 rollback を禁止**。初回公開時は roll-forward のみ、以降は floor を満たす deploy tag への rollback、CORS だけの `apply-legal-cors.ps1 -Remove` を分けて記載。`gachacho/legal/versions/*` と `gachacho/` 配下の手動削除を禁止事項に列挙。
- `docs/DEPLOYMENT.md` の 5.4 を「CORS 設定だけを戻す」に限定し、6 章「デプロイの安全順序と Rollback 方針」を追加（配布順、stub テスト、公開時の deploy tag 付与、floor、roll-forward 優先、版別JSON不削除）。

### 再検証

| 項目 | 結果 |
|---|---|
| `npm run lint` / `npm run build` / `git diff --check` | 成功 |
| `deploy.stubtest.ps1` | 24 / 24 PASS（上記） |
| AWS への書き込み | なし（stub のみ。`apply-legal-cors.ps1 -Apply`、`deploy.ps1` の実行は未実施） |

## 12. 停止位置

commit / push 済み。本番 deploy、`apply-legal-cors.ps1 -Apply`、Google・Firebase・ストア操作は未実施。Codex の再レビューとユーザーの個別承認を待つ。
