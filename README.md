# SmartThanks Corporate Site

株式会社SmartThanks のコーポレートサイト。

- **本番 URL**: https://smartthanks.world
- **旧ドメイン**: https://kool.co.jp（301リダイレクト済み）

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # プロダクションビルド → dist/
npm run lint     # ESLint チェック
npm run preview  # ビルド成果物のローカルプレビュー
```

## デプロイ

```powershell
.\infrastructure\scripts\deploy.ps1
```

S3 同期 + CloudFront Invalidation まで自動実行。詳細は `docs/DEPLOYMENT.md` を参照。

## ドキュメント

| ファイル | 内容 |
|---------|------|
| `CLAUDE.md` | AI 向けプロジェクトコンテキスト（設計・規約・FAQ） |
| `docs/DEPLOYMENT.md` | デプロイ・ドメイン移行手順 |
