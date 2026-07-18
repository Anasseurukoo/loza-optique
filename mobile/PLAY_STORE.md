# Publication Google Play — Loza Optique

## Liens officiels

- Site : https://lozaoptique.com
- Politique de confidentialité : https://lozaoptique.com/confidentialite/
- E-mail d'assistance : anidayacoub@gmail.com

## État réel de la version 0.0.3

- Aucun compte utilisateur.
- Aucun backend ou stockage distant.
- Aucun paiement.
- Aucun SDK publicitaire ou outil d'analyse.
- La caméra frontale sert uniquement à l'essayage AR en temps réel.
- Les images de la caméra et les repères du visage ne sont pas enregistrés ou envoyés.
- L'ordonnance choisie reste sur l'appareil et n'est pas téléversée.
- Les favoris et le rendez-vous restent dans la session de l'application.

Ces réponses devront être révisées avant d'ajouter AdMob, un backend, un compte
utilisateur, l'envoi d'une ordonnance ou une vraie réservation en ligne.

## Data Safety — base pour la version 0.0.3

Répondre selon le binaire réellement envoyé :

- Collecte ou partage de données par l'application : **Non**.
- Caméra : utilisée localement pour une fonctionnalité optionnelle d'essayage AR.
- Fichiers/ordonnance : sélection locale, sans transfert au développeur.
- Suppression de compte : sans objet, car aucun compte n'est créé.

## Build Android App Bundle

Depuis le dossier `mobile` :

```powershell
npm install
npx expo install --check
npx tsc --noEmit
npx eas-cli@latest build --platform android --profile production
```

Le profil `production` produit un fichier `.aab`. EAS incrémente le
`versionCode` à distance grâce à `appVersionSource: remote` et
`autoIncrement: true`.

## Premier lancement sur Google Play

Pour un nouveau compte personnel :

1. Créer l'application dans Play Console.
2. Compléter la fiche Play Store, la politique de confidentialité, Data Safety,
   la classification du contenu et le public cible.
3. Importer l'AAB dans une piste de test fermé.
4. Ajouter les testeurs et conserver les preuves de leur participation et de
   leurs retours.
5. Demander l'accès à la production lorsque Play Console rend l'option
   disponible.

## Contrôle avant chaque nouvelle version

- La version affichée correspond à `app.json` et `package.json`.
- Le package Android reste `com.lozaoptique.mobile`.
- Le lien de confidentialité fonctionne publiquement en HTTPS.
- L'autorisation caméra est expliquée avant sa demande.
- La fiche Data Safety correspond exactement aux SDK et fonctions du binaire.
- Les captures et textes de la fiche ne promettent pas un service non connecté.
