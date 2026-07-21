$ErrorActionPreference = "Stop"
$mobile = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $mobile
npx eas-cli@latest build --platform android --profile development
