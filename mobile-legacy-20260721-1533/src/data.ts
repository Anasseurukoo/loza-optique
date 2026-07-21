import type { ImageSourcePropType } from 'react-native';

export type Category = 'Tout' | 'Vue' | 'Solaire' | 'Accessoire';

export type CatalogueItem = {
  id: string;
  name: string;
  label: string;
  category: Exclude<Category, 'Tout'>;
  image: ImageSourcePropType;
  arImage?: ImageSourcePropType;
  color: string;
  tryOn?: boolean;
};

export const eyewear: CatalogueItem[] = [
  { id: 'p1', name: 'Alpine', label: 'SIGNATURE', category: 'Solaire', image: require('../assets/products/persol-alpine-sun.webp'), color: '#dfc994', tryOn: true },
  { id: 'p2', name: 'Noir Carré', label: 'ICONIC', category: 'Solaire', image: require('../assets/products/persol-black-square.webp'), color: '#b9cbca', tryOn: true },
  { id: 'p3', name: 'Ida Dorée', label: 'ÉDITION LOZA', category: 'Solaire', image: require('../assets/products/persol-gold-sun.webp'), color: '#e7ce91', tryOn: true },
  { id: 'p4', name: 'Indigo', label: 'ESSENTIAL', category: 'Vue', image: require('../assets/products/persol-blue-optical.webp'), color: '#c6d9d8', tryOn: true },
  { id: 'p5', name: 'Sauge', label: 'ESSENTIAL', category: 'Vue', image: require('../assets/products/persol-green-optical.webp'), color: '#d3dfc7', tryOn: true },
  { id: 'p6', name: 'Havane', label: 'HERITAGE', category: 'Solaire', image: require('../assets/products/persol-tortoise-sun.webp'), color: '#d9baa1', tryOn: true },
  { id: 'p7', name: 'Polar Noir', label: 'POLARISÉ', category: 'Solaire', image: require('../assets/products/persol-black-sun.webp'), color: '#b9c1be', tryOn: true },
  { id: 'p8', name: 'Dégradé', label: 'NOUVEAUTÉ', category: 'Solaire', image: require('../assets/products/persol-black-gradient.webp'), color: '#d2c9c1', tryOn: true },
];

export const accessories: CatalogueItem[] = [
  { id: 'a1', name: 'Étui cuir noir', label: 'CUIR PREMIUM', category: 'Accessoire', image: require('../assets/accessories/leather-case-black.webp'), color: '#c8c4bd' },
  { id: 'a2', name: 'Étui cuir havane', label: 'CUIR PREMIUM', category: 'Accessoire', image: require('../assets/accessories/leather-case-brown.webp'), color: '#dcc4aa' },
  { id: 'a3', name: 'Kit entretien', label: 'ESSENTIEL', category: 'Accessoire', image: require('../assets/accessories/cleaning-kit.webp'), color: '#c8d9d6' },
  { id: 'a4', name: 'Care kit premium', label: 'SOIN COMPLET', category: 'Accessoire', image: require('../assets/accessories/premium-care-kit.webp'), color: '#d6dbbd' },
  { id: 'a5', name: 'Étui suède', label: 'EXCLUSIF', category: 'Accessoire', image: require('../assets/accessories/exclusive-suede-case.webp'), color: '#ddc8bd' },
  { id: 'a6', name: 'Cordon cuir', label: 'ARTISANAL', category: 'Accessoire', image: require('../assets/accessories/leather-strap-kit.webp'), color: '#ddc8aa' },
  { id: 'a7', name: 'Clip-on polarisé', label: 'POLARISÉ', category: 'Accessoire', image: require('../assets/accessories/polarized-clip-on.webp'), color: '#bdcfce' },
  { id: 'a8', name: 'Étui voyage', label: 'NOMADE', category: 'Accessoire', image: require('../assets/accessories/travel-foldable-case.webp'), color: '#cfcec0' },
];

export const catalogue = [...eyewear, ...accessories];

export const lifestyle = [
  { id: 'l1', title: 'Alpine · Homme', image: require('../assets/lifestyle/persol-alpine-men.webp') },
  { id: 'l2', title: 'Alpine · Femme', image: require('../assets/lifestyle/persol-alpine-women.webp') },
  { id: 'l3', title: 'Noir carré · Homme', image: require('../assets/lifestyle/persol-men-black-square.webp') },
  { id: 'l4', title: 'Ronde · Homme', image: require('../assets/lifestyle/persol-men-round.webp') },
  { id: 'l5', title: 'Carrée · Homme', image: require('../assets/lifestyle/persol-men-square.webp') },
  { id: 'l6', title: 'Noir carré · Femme', image: require('../assets/lifestyle/persol-women-black-square.webp') },
  { id: 'l7', title: 'Ronde · Femme', image: require('../assets/lifestyle/persol-women-round.webp') },
  { id: 'l8', title: 'Carrée · Femme', image: require('../assets/lifestyle/persol-women-square.webp') },
];
