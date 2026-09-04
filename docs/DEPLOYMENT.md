# 独自ドメイン移行・デプロイ手順書

本プロジェクトの `smartthanks.world` への公開および `kool.co.jp` からのリダイレクト設定に関するドキュメントです。

## 1. インフラ構成
- **メインサイト**: `smartthanks.world`
  - S3 バケット: `kool-co-jp-web` (ap-northeast-1)
  - CloudFront: `E34UQ9BU9WL7K2`
  - DNS: Route 53
- **リダイレクト元**: `kool.co.jp`
  - DNS: Route 53 (移行中)
  - CloudFront: (証明書発行後に作成予定)

## 2. 作業依頼: ドメイン移行 (kool.co.jp)
AWS側でリダイレクトを有効にするために、ムームードメインの管理画面にて、`kool.co.jp` のネームサーバーを以下のAWSのものに変更してください。

**ネームサーバー一覧:**
1. `ns-632.awsdns-15.net`
2. `ns-79.awsdns-09.com`
3. `ns-1652.awsdns-14.co.uk`
4. `ns-1496.awsdns-59.org`

> [!IMPORTANT]
> ネームサーバーの変更が反映されるまで数時間〜最大48時間かかる場合があります。反映後、AWS側で自動的にSSL証明書の発行とリダイレクト設定が完了します。

## 3. 日常のデプロイ手順
サイトの更新を行う際は、以下のスクリプトを実行してください。

```powershell
.\infrastructure\scripts\deploy.ps1
```

このスクリプトは以下の処理を自動で行います：
1. `npm run build` によるビルド
2. `dist` フォルダの S3 同期
3. CloudFront のキャッシュ無効化 (Invalidation)

## 4. SPA (React Router) 対応について
CloudFrontの設定にて、403および404エラーを `/index.html` にリダイレクトし、ステータスコード 200 を返すように設定済みです。これにより、ブラウザで直接サブページ（例: `/contact`）をリロードしても正常に動作します。

## 5. ガチャちょう法務JSONの配信（Content-Type / CORS）
アプリ「ガチャちょう」は `https://smartthanks.world/gachacho/legal/current.json` を取得します（版別アーカイブは `versions/{documentVersion}.json`）。CapCole 側の公開要件は次の2点です。

- `Content-Type` に `json` を含むこと（含まない応答はアプリが拒否する）
- cross-origin GET 応答に `Access-Control-Allow-Origin: *` が付くこと（Web版アプリ向け。未設定でもアプリは同梱版へフォールバックする）

### 5.1 現状（2026-09-04 読み取り確認）
- S3 バケット `kool-co-jp-web` に CORS 設定なし（`get-bucket-cors` → `NoSuchCORSConfiguration`）
- CloudFront `E34UQ9BU9WL7K2` の既定ビヘイビアはレガシー `ForwardedValues`（ヘッダー転送なし）で、`ResponseHeadersPolicyId` なし、`CacheBehaviors` は 0 件
- つまり **現状では `Access-Control-Allow-Origin` は付与されない**。S3 側に CORS を足しても、CloudFront が `Origin` ヘッダーを転送しないため効果がない

### 5.2 保証方法
`Content-Type` は `deploy.ps1` が `gachacho/legal/` を `--content-type "application/json; charset=utf-8"` で明示アップロードすることで保証します（S3 sync の拡張子推定に依存しない）。

CORS は CloudFront に `/gachacho/legal/*` 専用のキャッシュビヘイビアを追加し、AWS 管理の `Managed-SimpleCORS` レスポンスヘッダーポリシーを付けて保証します。定義は `infrastructure/cloudfront/legal-json-cache-behavior.json`、適用は次のスクリプトで行います（**要承認。実行するまで AWS には何も反映されません**）。

```powershell
# 差分の表示のみ（読み取りだけ）
.\infrastructure\scripts\apply-legal-cors.ps1

# 適用（冪等。既に同じ内容なら変更なしで終了）
.\infrastructure\scripts\apply-legal-cors.ps1 -Apply
```

影響範囲は `/gachacho/legal/*` のみです。既定ビヘイビア、403/404 → `index.html` のSPAフォールバック、他のパスのキャッシュ設定は変更しません。適用前の設定は `infrastructure/cloudfront/backups/` に保存されます。

### 5.3 公開後確認（期待値）
```bash
# Content-Type と CORS（Origin ヘッダー付き cross-origin GET）
curl -sI -H "Origin: https://example.com" https://smartthanks.world/gachacho/legal/current.json
```
期待値:
- `HTTP/1.1 200` または `HTTP/2 200`
- `Content-Type: application/json; charset=utf-8`
- `Access-Control-Allow-Origin: *`（`Managed-SimpleCORS` は `Origin` ヘッダーがある要求にだけ付与する。`Origin` なしの要求に付かないのは正常）
- 本文の `documentVersion` が配信予定の版（例: `1.1`）と一致すること

```bash
curl -s https://smartthanks.world/gachacho/legal/current.json | python -c "import sys,json; print(json.load(sys.stdin)['documentVersion'])"
curl -sI https://smartthanks.world/gachacho/legal/versions/1.1.json | grep -i "content-type"
```

### 5.4 CORS 設定だけを戻す（Rollback）
```powershell
# /gachacho/legal/* のビヘイビアを削除し、追加前の状態に戻す
.\infrastructure\scripts\apply-legal-cors.ps1 -Remove
```
または `infrastructure/cloudfront/backups/` の保存ファイルから `DistributionConfig` を取り出し、`aws cloudfront update-distribution --if-match <現在のETag>` で復元します。これは CloudFront のビヘイビアだけを戻す操作で、S3 オブジェクト・サイト本体・法務JSONには影響しません（アプリは CORS がなくても同梱版へフォールバックします）。サイト本体の rollback は 6 章に従います。

## 6. デプロイの安全順序と Rollback 方針

### 6.1 `deploy.ps1` の動作
- 各ステップ（build と AWS CLI 呼び出し）は終了コードを確認し、失敗したら即時停止して `Deployment complete!` を表示しません。
- 配布順は次のとおりです。`index.html` を最後に置くことで、公開中の `index.html` が未配置の chunk や JSON を参照する時間をつくりません。
  1. `assets/`（ハッシュ付き。`--delete`）
  2. 画像・sitemap 等の一般ファイル（`index.html` と `gachacho/legal/*` を除外。`--delete`）
  3. `gachacho/legal/*`（`application/json; charset=utf-8` を明示。`--delete` なし。版別JSONは残す）
  4. `index.html`（切替点。no-cache）
  5. CloudFront Invalidation `/*`
- 副作用なしテスト: `.\infrastructure\scripts\tests\deploy.stubtest.ps1`（aws を stub に差し替え、途中失敗で停止することと順序を検証。`npm run build` は実行される）
- 公開時は公開したコミットへ tag を付けてください（例: `git tag deploy/20260904-t059 && git push origin deploy/20260904-t059`）。互換性を保つ rollback 先になります。

### 6.2 互換性 floor
公開中のアプリ「ガチャちょう」（iOS 1.0.1 / build 9 以降）が参照する次の URL は、初回公開後は常に動作する版だけを公開します。
- 旧 `/terms` → `/gachacho/terms` のリダイレクト
- `/gachacho/terms`（規約本文）
- `/gachacho/legal/current.json` と `versions/*.json`
- `/privacy`

**これらを持たない版（`e8ee101` 以前）への全面 rollback は禁止**です。旧版で `deploy.ps1` を実行すると `--delete` により `gachacho/` 配下が消え、規約URLが 404 になります。

### 6.3 問題発生時の手順
1. 原則 **roll-forward**: floor を保った修正版を作り、lint / build / stub テストの後に `deploy.ps1` で公開する。
2. rollback が必要な場合は、floor を満たす直近の deploy tag へ checkout して `deploy.ps1` を実行する（floor を満たさない tag へは戻さない）。
3. どの場合も S3 の `gachacho/legal/versions/*` を削除しない。`aws s3 rm` で `gachacho/` 配下を一括削除しない。
4. CORS だけを戻す場合は 5.4 の `-Remove` を使い、サイト本体の rollback と混同しない。
