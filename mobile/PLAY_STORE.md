# Publication Google Play — Loza Optique 1.0

## Liens officiels

- Site : https://lozaoptique.com
- Politique de confidentialité : https://lozaoptique.com/confidentialite/
- E-mail d’assistance : anidayacoub@gmail.com

## État réel de la version 1.0

- Aucun compte utilisateur, backend, paiement, SDK publicitaire ou outil d’analyse.
- La caméra frontale sert uniquement à l’essayage AR en temps réel.
- Les images et repères du visage sont traités localement, sans enregistrement ni transfert.
- L’ordonnance est copiée dans le stockage local de l’application. Elle est supprimable depuis le profil et n’est ni téléversée ni jointe à la demande de rendez-vous.
- Les favoris et les métadonnées de l’ordonnance persistent localement.
- La demande de rendez-vous ouvre l’application e-mail ; Loza confirme ensuite le créneau.

Ces réponses devront être révisées avant d’ajouter un backend, une authentification, des statistiques, de la publicité, un paiement, un téléversement de fichier ou une réservation serveur.

## Data Safety — base pour le binaire 1.0 actuel

Répondre selon le binaire réellement envoyé :

- Collecte ou partage de données par l’application : **Non**.
- Caméra : utilisée localement pour une fonction optionnelle d’essayage AR.
- Fichiers/ordonnance : stockage applicatif local, sans transfert au développeur.
- Suppression de compte : sans objet, car aucun compte n’est créé.

## Produire les binaires

Depuis `mobile` :

```bash
npm ci
npm run check
npx expo install --check
npx expo-doctor
npx eas-cli@latest build --platform android --profile development
npx eas-cli@latest build --platform android --profile production
```

Le development build produit l’APK nécessaire aux tests du suivi AR. Le profil production produit l’AAB et EAS incrémente le `versionCode` distant grâce à `appVersionSource: remote`.

## Barrière obligatoire avant production

1. Installer le development APK sur au moins trois téléphones Android représentatifs.
2. Valider les 10 montures en face, à gauche/droite, à trois distances et sous plusieurs éclairages.
3. Corriger les calibrations qui dépassent les tolérances visuelles prévues.
4. Générer un AAB et le placer d’abord sur la piste de test fermé.
5. Compléter fiche Store, captures, classification, public cible, politique et Data Safety.
6. Recueillir les retours des testeurs puis seulement demander l’accès à la production.

## Contrôle avant chaque version

- Version cohérente dans `app.json`, `package.json` et l’écran Profil.
- Package Android inchangé : `com.lozaoptique.mobile`.
- Lien de confidentialité public et fonctionnel en HTTPS.
- Permission caméra expliquée avant la demande système.
- Tests TypeScript, AR, Expo Doctor et export Android au vert.
- Data Safety fidèle aux fonctions et SDK du binaire livré.
- Aucun texte ne présente l’e-mail de rendez-vous comme une réservation déjà confirmée.
