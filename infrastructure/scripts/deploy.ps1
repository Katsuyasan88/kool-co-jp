# デプロイスクリプト (smartthanks.world用)

# 1. ビルド
Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

# 2. S3同期 (キャッシュ設定付き)
Write-Host "Syncing to S3 (kool-co-jp-web)..." -ForegroundColor Cyan

# ハッシュ付きアセット (長期キャッシュ)
aws s3 sync dist/assets s3://kool-co-jp-web/assets --delete --cache-control "max-age=31536000, immutable"

# index.html (キャッシュなし - 常に最新を確認)
aws s3 cp dist/index.html s3://kool-co-jp-web/index.html --cache-control "no-cache, no-store, must-revalidate"

# その他のファイル (短〜中期間キャッシュ)
aws s3 sync dist/ s3://kool-co-jp-web --exclude "assets/*" --exclude "index.html" --delete --cache-control "max-age=86400"

# 3. CloudFrontキャッシュ無効化
Write-Host "Invalidating CloudFront cache..." -ForegroundColor Cyan
$DIST_ID = "E34UQ9BU9WL7K2"
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"

Write-Host "Deployment complete!" -ForegroundColor Green
