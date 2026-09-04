# ガチャちょう法務JSON（/gachacho/legal/*）に CORS ヘッダーを付与する CloudFront 設定の適用・削除スクリプト
#
# 目的:
#   アプリと Web 版が https://smartthanks.world/gachacho/legal/current.json を cross-origin で取得できるよう、
#   /gachacho/legal/* だけに AWS 管理の Managed-SimpleCORS レスポンスヘッダーポリシーを持つ
#   キャッシュビヘイビアを追加する。既定ビヘイビア（サイト本体）や S3 バケットの設定には触れない。
#
# 使い方:
#   .\infrastructure\scripts\apply-legal-cors.ps1            # 差分の表示のみ（何も変更しない）
#   .\infrastructure\scripts\apply-legal-cors.ps1 -Apply     # ビヘイビアを追加/更新する（冪等）
#   .\infrastructure\scripts\apply-legal-cors.ps1 -Remove    # ビヘイビアを削除する（rollback）
#
# 前提: aws CLI v2 と CloudFront の Get/UpdateDistribution 権限。適用前の設定は
#       infrastructure/cloudfront/backups/ に保存する（git 管理外）。

param(
    [switch]$Apply,
    [switch]$Remove
)

$ErrorActionPreference = 'Stop'

$DistributionId = 'E34UQ9BU9WL7K2'
$PathPattern = '/gachacho/legal/*'
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$BehaviorFile = Join-Path $RepoRoot 'infrastructure\cloudfront\legal-json-cache-behavior.json'
$BackupDir = Join-Path $RepoRoot 'infrastructure\cloudfront\backups'

if ($Apply -and $Remove) { Write-Error '-Apply と -Remove は同時に指定できません'; exit 1 }

# 1. 現在の設定を取得
$raw = aws cloudfront get-distribution-config --id $DistributionId --output json
if ($LASTEXITCODE -ne 0) { Write-Error 'get-distribution-config に失敗しました'; exit 1 }
$current = $raw | ConvertFrom-Json
$etag = $current.ETag
$config = $current.DistributionConfig

# 2. 目標ビヘイビア（_comment は API に渡さない）
$desired = Get-Content $BehaviorFile -Raw -Encoding utf8 | ConvertFrom-Json
$desired.PSObject.Properties.Remove('_comment')
if ($desired.PathPattern -ne $PathPattern) { Write-Error "PathPattern が想定と異なります: $($desired.PathPattern)"; exit 1 }

$originIds = @($config.Origins.Items | ForEach-Object { $_.Id })
if ($originIds -notcontains $desired.TargetOriginId) {
    Write-Error "TargetOriginId $($desired.TargetOriginId) がディストリビューションに存在しません（存在: $($originIds -join ', ')）"
    exit 1
}

# 3. 既存ビヘイビアの有無を確認
$existing = @()
if ($config.CacheBehaviors.Quantity -gt 0) { $existing = @($config.CacheBehaviors.Items) }
$matched = $existing | Where-Object { $_.PathPattern -eq $PathPattern }
$others = @($existing | Where-Object { $_.PathPattern -ne $PathPattern })

$desiredJson = ($desired | ConvertTo-Json -Depth 20 -Compress)
$matchedJson = if ($matched) { ($matched | ConvertTo-Json -Depth 20 -Compress) } else { '' }

Write-Host "Distribution: $DistributionId (ETag $etag)" -ForegroundColor Cyan
Write-Host "既存 CacheBehaviors: $($existing.Count) 件。'$PathPattern' は " -NoNewline
if ($matched) { Write-Host '存在します' -ForegroundColor Yellow } else { Write-Host '存在しません' -ForegroundColor Yellow }

if ($Remove) {
    if (-not $matched) { Write-Host '削除対象がありません。変更なし。' -ForegroundColor Green; exit 0 }
    $newItems = $others
} else {
    if ($matched -and ($matchedJson -eq $desiredJson)) {
        Write-Host '既に目標どおりです。変更なし。' -ForegroundColor Green
        exit 0
    }
    $newItems = @($others) + @($desired)
}

$config.CacheBehaviors = [pscustomobject]@{
    Quantity = $newItems.Count
    Items    = @($newItems)
}
if ($newItems.Count -eq 0) { $config.CacheBehaviors = [pscustomobject]@{ Quantity = 0 } }

Write-Host ''
Write-Host '適用後の CacheBehaviors:' -ForegroundColor Cyan
$config.CacheBehaviors | ConvertTo-Json -Depth 20

if (-not $Apply -and -not $Remove) {
    Write-Host ''
    Write-Host 'ドライランです。適用するには -Apply、削除するには -Remove を付けて実行してください。' -ForegroundColor Yellow
    exit 0
}

# 4. バックアップ
New-Item -ItemType Directory -Force $BackupDir | Out-Null
$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupPath = Join-Path $BackupDir "$DistributionId`_$stamp.json"
$raw | Out-File -FilePath $backupPath -Encoding utf8
Write-Host "適用前の設定を保存: $backupPath" -ForegroundColor Cyan

# 5. 更新
$tmp = New-TemporaryFile
($config | ConvertTo-Json -Depth 30) | Out-File -FilePath $tmp.FullName -Encoding utf8
aws cloudfront update-distribution --id $DistributionId --if-match $etag --distribution-config "file://$($tmp.FullName)" --output json | Out-Null
$rc = $LASTEXITCODE
Remove-Item $tmp.FullName -Force
if ($rc -ne 0) { Write-Error 'update-distribution に失敗しました。設定は変更されていません。'; exit 1 }

Write-Host 'update-distribution 完了。デプロイ完了を待機します（数分）...' -ForegroundColor Cyan
aws cloudfront wait distribution-deployed --id $DistributionId
Write-Host '完了。公開後確認は docs/DEPLOYMENT.md 5章の curl 手順で行ってください。' -ForegroundColor Green
