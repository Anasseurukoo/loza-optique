# LOZA Mobile V2 — One-Shot Upgrade

This pack does **not** rebuild the app from zero.

It automatically:

1. Backs up the temporary Expo starter.
2. Restores the existing Loza mobile app from the `main` branch.
3. Installs the new LOZA visual identity.
4. Synchronizes the Persol catalog and measurements from Website V2.
5. Installs a complete premium mobile interface.
6. Keeps favorites, prescription picker, booking, store contact and product details.
7. Adds two AR modes:
   - Expo Go: camera + manual calibration.
   - Development APK: automatic face tracking with frame measurements.
8. Validates the project with Expo Doctor and TypeScript.

## Run once

Stop Expo with `Ctrl + C`.

Extract this folder inside `C:\Users\pc\loza-optique`.

From the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\LOZA_Mobile_V2_OneShot\install-mobile-v2.ps1
```

## Test in Expo Go

```powershell
cd mobile
npx expo start --clear
```

## Automatic AR development APK

```powershell
cd mobile
powershell -ExecutionPolicy Bypass -File .\build-development-apk.ps1
```

## Production AAB

Run only after final approval:

```powershell
cd mobile
powershell -ExecutionPolicy Bypass -File .\build-production-aab.ps1
```

The production script creates an AAB. It does not upload anything to Google Play.
