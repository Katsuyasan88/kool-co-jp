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
