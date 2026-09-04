# deploy.ps1 の副作用なしテスト
#
# 実際の aws CLI を呼ばず、PATH の先頭に置いた stub (aws.cmd) で各呼び出しを記録し、
# 指定したステップで失敗させたときに deploy.ps1 が即時停止して成功表示へ進まないことを確認する。
# npm run build は実行する（AWS への書き込みは一切発生しない）。
#
# 使い方: .\infrastructure\scripts\tests\deploy.stubtest.ps1

$ErrorActionPreference = 'Stop'
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..\..')
$Deploy = Join-Path $RepoRoot 'infrastructure\scripts\deploy.ps1'
$Work = Join-Path ([System.IO.Path]::GetTempPath()) ("smartthanks-deploy-stubtest-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $Work | Out-Null
$Log = Join-Path $Work 'calls.log'

# 引数を記録し、STUB_FAIL_MATCH に一致する呼び出しだけ exit 1 を返す stub
$stub = @"
@echo off
echo %* >> "$Log"
if defined STUB_FAIL_MATCH (
  echo %* | findstr /C:"%STUB_FAIL_MATCH%" >nul && exit /b 1
)
exit /b 0
"@
Set-Content -Path (Join-Path $Work 'aws.cmd') -Value $stub -Encoding ascii

$expectedOrder = @('s3 sync', 's3 sync', 's3 cp', 's3 cp', 'cloudfront create-invalidation')

function Run-Deploy {
    param([string] $FailMatch)
    if (Test-Path $Log) { Remove-Item $Log -Force }
    $env:STUB_FAIL_MATCH = $FailMatch
    $origPath = $env:PATH
    $env:PATH = "$Work;$origPath"
    try {
        $output = & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $Deploy 2>&1 | Out-String
        $code = $LASTEXITCODE
    } finally {
        $env:PATH = $origPath
        Remove-Item Env:\STUB_FAIL_MATCH -ErrorAction SilentlyContinue
    }
    $calls = @()
    if (Test-Path $Log) { $calls = @(Get-Content $Log | Where-Object { $_.Trim() -ne '' }) }
    return [pscustomobject]@{ ExitCode = $code; Output = $output; Calls = $calls }
}

$failures = 0
function Assert {
    param([bool] $Condition, [string] $Message)
    if ($Condition) { Write-Host "  PASS  $Message" -ForegroundColor Green }
    else { Write-Host "  FAIL  $Message" -ForegroundColor Red; $script:failures++ }
}

# ケース1: すべて成功 → 順序どおり 5 回呼ばれ、成功表示、exit 0
Write-Host 'Case 1: all succeed' -ForegroundColor Cyan
$r = Run-Deploy -FailMatch ''
Assert ($r.ExitCode -eq 0) "exit code 0 (actual $($r.ExitCode))"
Assert ($r.Calls.Count -eq 5) "aws called 5 times (actual $($r.Calls.Count))"
for ($i = 0; $i -lt $expectedOrder.Count; $i++) {
    Assert ($r.Calls.Count -gt $i -and $r.Calls[$i].StartsWith($expectedOrder[$i])) "call $($i+1) is '$($expectedOrder[$i])'"
}
Assert ($r.Calls.Count -ge 4 -and $r.Calls[2] -like '*gachacho/legal*' -and $r.Calls[2] -like '*application/json*') 'legal JSON uploaded with explicit Content-Type before index.html'
Assert ($r.Calls.Count -ge 4 -and $r.Calls[3] -like '*index.html*') 'index.html is uploaded after assets, static files and legal JSON'
Assert (@($r.Calls | Where-Object { $_ -like 's3 sync*' -and $_ -like '*s3://*/gachacho/legal*' }).Count -eq 0) 'legal JSON is never synced with --delete (only excluded from sync)'
Assert ($r.Output -match 'Deployment complete!') 'success message shown'

# ケース2: 法務JSON upload が失敗 → index.html と invalidation は呼ばれず、成功表示なし、exit 1
Write-Host 'Case 2: legal JSON upload fails' -ForegroundColor Cyan
$r = Run-Deploy -FailMatch 'application/json'
Assert ($r.ExitCode -eq 1) "exit code 1 (actual $($r.ExitCode))"
Assert ($r.Calls.Count -eq 3) "stops after 3rd aws call (actual $($r.Calls.Count))"
Assert (@($r.Calls | Where-Object { $_ -like 's3 cp*' -and $_ -like '*index.html*' }).Count -eq 0) 'index.html is NOT uploaded'
Assert (@($r.Calls | Where-Object { $_ -like 'cloudfront*' }).Count -eq 0) 'invalidation is NOT created'
Assert ($r.Output -notmatch 'Deployment complete!') 'no success message'
Assert ($r.Output -match 'FAILED: Upload legal JSON') 'failure names the step'

# ケース3: assets sync が失敗 → 以降は何も呼ばれない
Write-Host 'Case 3: assets sync fails' -ForegroundColor Cyan
$r = Run-Deploy -FailMatch 'assets'
Assert ($r.ExitCode -eq 1) "exit code 1 (actual $($r.ExitCode))"
Assert ($r.Calls.Count -eq 1) "stops after 1st aws call (actual $($r.Calls.Count))"
Assert ($r.Output -notmatch 'Deployment complete!') 'no success message'

# ケース4: invalidation が失敗 → 成功表示なし、exit 1
Write-Host 'Case 4: invalidation fails' -ForegroundColor Cyan
$r = Run-Deploy -FailMatch 'create-invalidation'
Assert ($r.ExitCode -eq 1) "exit code 1 (actual $($r.ExitCode))"
Assert ($r.Calls.Count -eq 5) "all 5 aws calls attempted (actual $($r.Calls.Count))"
Assert ($r.Output -notmatch 'Deployment complete!') 'no success message'

Remove-Item -Recurse -Force $Work
Write-Host ''
if ($failures -eq 0) { Write-Host 'ALL PASSED' -ForegroundColor Green; exit 0 }
else { Write-Host "$failures assertion(s) FAILED" -ForegroundColor Red; exit 1 }
