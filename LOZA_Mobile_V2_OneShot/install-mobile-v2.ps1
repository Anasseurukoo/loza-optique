$ErrorActionPreference = "Stop"

function Find-RepoRoot {
  $cursor = (Get-Location).Path
  while ($cursor) {
    if (Test-Path (Join-Path $cursor ".git")) {
      return $cursor
    }
    $parent = Split-Path $cursor -Parent
    if ($parent -eq $cursor) { break }
    $cursor = $parent
  }
  throw "Git repository not found. Run this script from loza-optique or one of its subfolders."
}

$repoRoot = Find-RepoRoot
$packRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$mobile = Join-Path $repoRoot "mobile"
$website = Join-Path $repoRoot "website"
$branch = (git -C $repoRoot branch --show-current).Trim()

Write-Host "LOZA Mobile V2 One-Shot" -ForegroundColor Cyan
Write-Host "Repository: $repoRoot"
Write-Host "Branch: $branch"

if (!(Test-Path (Join-Path $website "public\brand\logo-navbar-v3-tight.png"))) {
  throw "New LOZA logo not found in website\public\brand."
}

if (!(Test-Path (Join-Path $website "public\images\products\persol"))) {
  throw "Persol product folder not found in website\public\images\products\persol."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path (Split-Path $repoRoot -Parent) "loza-optique-backups"
$backup = Join-Path $backupRoot "mobile-starter-$timestamp"
New-Item -ItemType Directory -Force -Path $backup | Out-Null

if (Test-Path $mobile) {
  Write-Host "[1/8] Backing up the temporary starter app..." -ForegroundColor Yellow
  & robocopy $mobile $backup /E /XD node_modules .expo .git /NFL /NDL /NJH /NJS /NP | Out-Null
  Remove-Item $mobile -Recurse -Force
}

Write-Host "[2/8] Restoring the existing Loza mobile app from main..." -ForegroundColor Yellow
git -C $repoRoot checkout main -- mobile
if ($LASTEXITCODE -ne 0) {
  throw "Could not restore the existing mobile app from main."
}

Write-Host "[3/8] Installing the complete Mobile V2 code..." -ForegroundColor Yellow
Copy-Item (Join-Path $packRoot "files\App.tsx") (Join-Path $mobile "App.tsx") -Force
Copy-Item (Join-Path $packRoot "files\index.ts") (Join-Path $mobile "index.ts") -Force
Copy-Item (Join-Path $packRoot "files\package.json") (Join-Path $mobile "package.json") -Force
Copy-Item (Join-Path $packRoot "files\app.json") (Join-Path $mobile "app.json") -Force
Copy-Item (Join-Path $packRoot "files\eas.json") (Join-Path $mobile "eas.json") -Force
Copy-Item (Join-Path $packRoot "files\babel.config.js") (Join-Path $mobile "babel.config.js") -Force
Copy-Item (Join-Path $packRoot "files\tsconfig.json") (Join-Path $mobile "tsconfig.json") -Force

New-Item -ItemType Directory -Force -Path (Join-Path $mobile "src") | Out-Null
Copy-Item (Join-Path $packRoot "files\src\data.ts") (Join-Path $mobile "src\data.ts") -Force
Copy-Item (Join-Path $packRoot "files\src\TryOnScreen.tsx") (Join-Path $mobile "src\TryOnScreen.tsx") -Force
Copy-Item (Join-Path $packRoot "files\src\TryOnExpoGo.tsx") (Join-Path $mobile "src\TryOnExpoGo.tsx") -Force
Copy-Item (Join-Path $packRoot "files\src\TryOnNative.tsx") (Join-Path $mobile "src\TryOnNative.tsx") -Force

Write-Host "[4/8] Installing the official brand assets..." -ForegroundColor Yellow
$brandTarget = Join-Path $mobile "assets\brand"
New-Item -ItemType Directory -Force -Path $brandTarget | Out-Null
Copy-Item (Join-Path $website "public\brand\logo-navbar-v3-tight.png") (Join-Path $brandTarget "logo-horizontal.png") -Force
Copy-Item (Join-Path $website "public\brand\app-icon-1024.png") (Join-Path $brandTarget "icon.png") -Force
Copy-Item (Join-Path $website "public\brand\app-splash-1242x2688.png") (Join-Path $brandTarget "splash.png") -Force

Write-Host "[5/8] Synchronizing Persol products and measurements..." -ForegroundColor Yellow
$persolTarget = Join-Path $mobile "assets\products\persol"
New-Item -ItemType Directory -Force -Path $persolTarget | Out-Null
$requiredProducts = @(
  "po1018s-front.webp",
  "po1019s-front.webp",
  "po2496sz-front.webp",
  "po3007v-front.webp",
  "po3264s-front.webp",
  "po3269s-front.webp",
  "po3318v-front.webp",
  "po3342s-front.webp",
  "po3393s-front.webp",
  "po3396s-front.webp"
)
foreach ($file in $requiredProducts) {
  $source = Join-Path $website "public\images\products\persol\$file"
  if (!(Test-Path $source)) {
    throw "Missing Persol image: $file"
  }
  Copy-Item $source (Join-Path $persolTarget $file) -Force
}

Write-Host "[6/8] Installing dependencies..." -ForegroundColor Yellow
Set-Location $mobile
Remove-Item ".\node_modules", ".\.expo" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item ".\package-lock.json" -Force -ErrorAction SilentlyContinue

npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

npx expo install expo-camera expo-constants expo-linear-gradient expo-splash-screen @react-native-async-storage/async-storage @expo/vector-icons
if ($LASTEXITCODE -ne 0) { throw "Expo dependency alignment failed." }

Write-Host "[7/8] Running Expo Doctor and TypeScript validation..." -ForegroundColor Yellow
npx expo-doctor
if ($LASTEXITCODE -ne 0) { throw "Expo Doctor reported blocking errors." }

npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { throw "TypeScript validation failed." }

Write-Host "[8/8] Mobile V2 is installed." -ForegroundColor Green
Write-Host ""
Write-Host "Expo Go test:" -ForegroundColor Cyan
Write-Host "  cd `"$mobile`""
Write-Host "  npx expo start --clear"
Write-Host ""
Write-Host "Automatic AR development APK:" -ForegroundColor Cyan
Write-Host "  npx eas-cli@latest build --platform android --profile development"
Write-Host ""
Write-Host "Production AAB (only after final approval):" -ForegroundColor Cyan
Write-Host "  npx eas-cli@latest build --platform android --profile production"
Write-Host ""
Write-Host "Starter backup: $backup" -ForegroundColor DarkGray
