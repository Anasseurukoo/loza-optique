# Loza Optique Mobile 1.0 — Release Candidate

Date : 21 juillet 2026  
Branche locale : `feat/mobile-v1-release-candidate`

## Résultat livré

Le projet ne contient plus les deux archives mobiles concurrentes. `mobile/` est désormais l’unique application à maintenir. La version est passée à 1.0.0 avec une expérience visuelle mobile dédiée, un catalogue enrichi et un Virtual Mirror utilisant une géométrie commune en mode manuel et natif.

## Changements principaux

- Nouvelle direction visuelle petrol, ivoire et or, avec accueil éditorial, catalogue en grille, favoris, profil, fiche produit et navigation AR centrale.
- Catalogue local de 10 montures Persol et 8 accessoires.
- 10 images AR frontales recadrées sur la zone visible de la monture.
- Calibration indépendante par modèle : aspect, échelle, décalage et réaction au lacet.
- Suivi natif des deux yeux, rotation, lacet/perspective 2.5D, fallback sur les limites du visage et lissage temporel.
- Réglage fin de l’échelle et de la hauteur dans les modes automatique et manuel.
- Favoris persistants ; ordonnance locale persistante, remplaçable et supprimable.
- Demande de rendez-vous honnête : l’application ouvre un e-mail et ne prétend pas que le créneau est déjà confirmé.
- Permissions Android durcies : suppression explicite du stockage legacy et de l’overlay système.
- Politique de confidentialité du site alignée sur la version 1.0.
- Workflow GitHub de qualité ajouté pour le mobile et le site.

## Vérifications exécutées

| Contrôle | Résultat |
|---|---|
| TypeScript mobile | Réussi |
| Tests de géométrie AR | 7/7 réussis |
| Export JavaScript Android | Réussi, 912 modules et 54 assets |
| Prebuild Android natif | Réussi |
| Identifiant Android | `com.lozaoptique.mobile` confirmé |
| Manifest release | Caméra, Internet et vibration ; permissions legacy bloquées |
| Validation des 10 assets AR | Réussie, alpha et dimensions contrôlés |
| Lint du site | Réussi |
| Build production du site | Réussi, 16 pages statiques |
| Expo Doctor | À relancer en CI : le contrôle en ligne a été bloqué par le proxy de l’environnement |

## Ce qui reste avant une publication publique

Le code est un Release Candidate prêt à produire un development APK, mais aucune équipe sérieuse ne peut certifier un essayage caméra à 100 % sans test sur téléphones physiques. La publication Play Store doit rester bloquée jusqu’à la fin des points suivants :

1. Tester les 10 montures sur au moins trois modèles Android.
2. Couvrir visage fin/moyen/large, lumière faible/forte, trois distances et rotations gauche/droite.
3. Noter les écarts de largeur, hauteur et stabilité puis ajuster uniquement la calibration du modèle concerné.
4. Vérifier permission refusée/acceptée, caméra absente, reprise après arrière-plan et téléphone hors ligne.
5. Tester ajout, remplacement et suppression d’ordonnance après redémarrage.
6. Tester la demande de rendez-vous avec et sans application e-mail.
7. Distribuer un APK preview aux testeurs, corriger les retours, puis générer l’AAB pour la piste fermée.

## Cycle conseillé sur un mois

- Semaine 1 : matrice appareils et calibration des 10 montures.
- Semaine 2 : accessibilité, petits écrans, erreurs caméra et performance.
- Semaine 3 : retours utilisateurs, textes Store, captures et Data Safety.
- Semaine 4 : régression complète, test fermé, corrections finales et décision de publication.

## Commandes de contrôle

```bash
cd mobile
npm ci
npm run check
npx expo-doctor
npx expo export --platform android
npx eas-cli@latest build --platform android --profile development
```

La dernière commande utilise EAS et doit être lancée uniquement depuis le compte Expo autorisé. Elle produit le binaire nécessaire au vrai test AR ; elle ne publie rien sur Google Play.
