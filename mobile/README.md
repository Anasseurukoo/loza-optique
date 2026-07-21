# Loza Optique Mobile 1.0

Application premium Android/iOS de Loza Optique, construite avec Expo, React Native et TypeScript.

## Ce que contient la Release Candidate

- Accueil éditorial, catalogue filtrable, recherche et fiches produit détaillées.
- 10 montures Persol, 8 accessoires et 6 campagnes lifestyle.
- Favoris persistants sur l’appareil.
- Ordonnance PDF ou image conservée localement, remplaçable et supprimable depuis le profil.
- Demande de rendez-vous avec six jours ouvrés et solution de repli par téléphone.
- Virtual Mirror avec 10 assets AR recadrés, calibration par modèle et correction selon les dimensions physiques.
- Suivi natif des yeux, du roulis et du lacet, perspective 2.5D, lissage temporel et réglage fin manuel.
- Mode manuel compatible Expo Go pour valider rapidement le design et les assets.
- Traitement caméra local : aucune photo ni repère facial n’est enregistré ou envoyé.

## Vérifier le projet

```bash
npm ci
npm run check
npx expo-doctor
npx expo export --platform android
```

`npm run check` exécute le typecheck TypeScript et les 7 tests de géométrie AR.

## Tester le Virtual Mirror

Expo Go ouvre automatiquement le mode manuel :

```bash
npx expo start
```

Le suivi facial automatique requiert les modules natifs du development build :

```bash
npx eas-cli@latest build --platform android --profile development
```

Le profil `preview` produit aussi un APK interne partageable. Avant toute publication, tester ce binaire sur plusieurs téléphones Android, avec lumière faible/forte, lunettes déjà portées, rotations de tête et différentes distances caméra.

## Builds Android

```bash
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform android --profile production
```

Le profil `production` produit un AAB. Ne pas le soumettre en production sans avoir terminé le test fermé et validé la fiche Data Safety.

## Limites connues de cette étape

- Le catalogue est local et ne gère ni stock ni prix en temps réel.
- La réservation prépare un e-mail ; elle n’est confirmée qu’après réponse de la boutique.
- L’ordonnance n’est jamais jointe à l’e-mail et doit être présentée en boutique.
- La précision visuelle du Virtual Mirror doit encore être validée sur appareils physiques avant de revendiquer une calibration finale.
