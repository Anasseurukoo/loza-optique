# Loza Optique Mobile

Application mobile Android/iOS de Loza Optique, construite avec Expo, React Native et TypeScript.

## Version 0.0.2

- Accueil premium fidèle à l'identité Loza.
- Catalogue filtrable et recherche de montures.
- Les 8 montures, 8 accessoires et 8 visuels lifestyle sont synchronisés avec le site officiel.
- Favoris interactifs.
- Parcours de prise de rendez-vous.
- Virtual Mirror AR avec caméra frontale, détection ML Kit des repères du visage et suivi temps réel des montures.
- Traitement AR local sur le téléphone : aucune image n'est envoyée vers un serveur.
- Espace client préparé pour une future authentification.
- Navigation mobile complète et responsive.

## Lancer le projet

```bash
npm install
npx expo start --dev-client
```

Le Virtual Mirror utilise des modules natifs qui ne sont pas inclus dans Expo Go. La version 0.0.2 doit donc être lancée avec un development build.

## Générer les APK Android

```bash
npx eas-cli@latest build --platform android --profile development
npx eas-cli@latest build --platform android --profile preview
```

Le profil `development` sert aux tests et au réglage du suivi AR. Le profil `preview` produit l'APK de démonstration partageable.

## Prochaines étapes

1. Remplacer les produits de démonstration par le catalogue réel dès validation par la boutique.
2. Connecter Supabase (produits, clients et rendez-vous).
3. Remplacer les visuels de démonstration par des PNG/WebP frontaux calibrés dès réception des photos réelles.
4. Ajouter les notifications et le suivi de commande.
5. Ajouter arabe/français.
6. Préparer les builds Google Play et App Store.
