$ErrorActionPreference = "Stop"
$mobile = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $mobile
Write-Host "This creates the production AAB. It does NOT upload to Play Store." -ForegroundColor Yellow
npx eas-cli@latest build --platform android --profile production
