# デプロイスクリプト (smartthanks.world用)
#
# 方針:
#   - 各ステップ（build / AWS CLI）は失敗したら即時停止し、以降の処理と成功表示へ進まない
#   - 配布順は「ハッシュ付き assets → 画像等の一般ファイル → 法務JSON → index.html（切替点）→ Invalidation」
#     公開中の index.html が未配置の chunk や JSON を参照する時間をつくらない
#   - S3 の gachacho/legal/versions/* は削除しない（旧版JSONは rollback・履歴のため残す）
#
# 副作用なしテスト: .\infrastructure\scripts\tests\deploy.stubtest.ps1（aws を stub に差し替えて停止動作を検証）

$ErrorActionPreference = 'Stop'

$Bucket = 'kool-co-jp-web'
$DistributionId = 'E34UQ9BU9WL7K2'
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$Dist = Join-Path $RepoRoot 'dist'

# 1 ステップ実行し、終了コードが 0 以外なら即時停止する
function Invoke-Step {
    param(
        [Parameter(Mandatory)] [string] $Name,
        [Parameter(Mandatory)] [scriptblock] $Action
    )
    Write-Host "[$Name]" -ForegroundColor Cyan
    $global:LASTEXITCODE = 0
    & $Action
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $Name (exit code $LASTEXITCODE). 以降の処理を中止します。Deployment は完了していません。" -ForegroundColor Red
        exit 1
    }
}

# 1. ビルド
Invoke-Step 'Build' { npm run build }
if (-not (Test-Path (Join-Path $Dist 'index.html'))) {
    Write-Host 'FAILED: dist/index.html が見つかりません。' -ForegroundColor Red
    exit 1
}

# 2. ハッシュ付きアセット (長期キャッシュ)。index.html より先に配置する
Invoke-Step 'Sync assets' {
    aws s3 sync "$Dist/assets" "s3://$Bucket/assets" --delete --cache-control "max-age=31536000, immutable"
}

# 3. その他のファイル (画像・sitemap 等。短〜中期間キャッシュ)。index.html と法務JSONは除外
Invoke-Step 'Sync static files' {
    aws s3 sync "$Dist/" "s3://$Bucket" --exclude "assets/*" --exclude "index.html" --exclude "gachacho/legal/*" --delete --cache-control "max-age=86400"
}

# 4. ガチャちょう法務JSON (アプリが Content-Type に json を含む応答だけを受理するため明示する。旧版JSONは削除しない)
Invoke-Step 'Upload legal JSON' {
    aws s3 cp "$Dist/gachacho/legal" "s3://$Bucket/gachacho/legal" --recursive --content-type "application/json; charset=utf-8" --cache-control "max-age=3600"
}

# 5. index.html (切替点。キャッシュなし - 常に最新を確認)
Invoke-Step 'Upload index.html' {
    aws s3 cp "$Dist/index.html" "s3://$Bucket/index.html" --cache-control "no-cache, no-store, must-revalidate"
}

# 6. CloudFrontキャッシュ無効化
Invoke-Step 'Invalidate CloudFront' {
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Host "Deployment complete!" -ForegroundColor Green
