import type { ImageSourcePropType } from 'react-native';

export type Category = 'Tout' | 'Vue' | 'Solaire' | 'Accessoire';

export type Measurements = {
  lens: number;
  bridge: number;
  temple: number;
  opticalWidth: number;
};

export type ArCalibration = {
  scale: number;
  offsetX: number;
  offsetY: number;
  aspect: number;
};

export type CatalogueItem = {
  id: string;
  code: string;
  name: string;
  brand: string;
  category: Exclude<Category, 'Tout'>;
  image: ImageSourcePropType;
  arImage?: ImageSourcePropType;
  color: string;
  description: string;
  measurements: Measurements;
  ar: ArCalibration;
  tryOn?: boolean;
};

const m = (lens: number, bridge: number, temple: number): Measurements => ({
  lens,
  bridge,
  temple,
  opticalWidth: lens * 2 + bridge,
});

export const eyewear: CatalogueItem[] = [
  {
    id: 'po2496sz',
    code: 'PO2496SZ',
    name: 'Alpine Signature',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po2496sz-front.webp'),
    arImage: require('../assets/products/persol/po2496sz-front.webp'),
    color: '#D8C69C',
    description: 'Une monture ronde en métal, inspirée de l’héritage alpin de Persol.',
    measurements: m(52, 18, 140),
    ar: { scale: 1.02, offsetX: 0, offsetY: -0.005, aspect: 3.12 },
    tryOn: true,
  },
  {
    id: 'po1019s',
    code: 'PO1019S',
    name: 'Or Violet',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po1019s-front.webp'),
    arImage: require('../assets/products/persol/po1019s-front.webp'),
    color: '#E8D8C6',
    description: 'Métal doré et verres violets pour une silhouette fine et lumineuse.',
    measurements: m(53, 20, 140),
    ar: { scale: 1, offsetX: 0, offsetY: -0.006, aspect: 3.2 },
    tryOn: true,
  },
  {
    id: 'po1018s',
    code: 'PO1018S',
    name: 'Ida Dorée',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po1018s-front.webp'),
    arImage: require('../assets/products/persol/po1018s-front.webp'),
    color: '#DCCB9F',
    description: 'Une monture ronde dorée aux verres verts polarisés.',
    measurements: m(52, 21, 145),
    ar: { scale: 1.01, offsetX: 0, offsetY: -0.004, aspect: 3.12 },
    tryOn: true,
  },
  {
    id: 'po3393s',
    code: 'PO3393S',
    name: 'Havane Solaire',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po3393s-front.webp'),
    arImage: require('../assets/products/persol/po3393s-front.webp'),
    color: '#DFC4AD',
    description: 'Acétate havane, double pont et verres verts au caractère affirmé.',
    measurements: m(56, 20, 145),
    ar: { scale: 1.04, offsetX: 0, offsetY: 0.002, aspect: 3.45 },
    tryOn: true,
  },
  {
    id: 'po3264s',
    code: 'PO3264S',
    name: 'Noir & Or',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po3264s-front.webp'),
    arImage: require('../assets/products/persol/po3264s-front.webp'),
    color: '#C2C7C4',
    description: 'Une construction noire et dorée avec un pont architectural.',
    measurements: m(50, 22, 140),
    ar: { scale: 0.99, offsetX: 0, offsetY: -0.006, aspect: 3.05 },
    tryOn: true,
  },
  {
    id: 'po3269s',
    code: 'PO3269S',
    name: 'Noir Carré',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po3269s-front.webp'),
    arImage: require('../assets/products/persol/po3269s-front.webp'),
    color: '#C9C4C0',
    description: 'Une forme carrée noire, équilibrée et facile à porter.',
    measurements: m(52, 20, 145),
    ar: { scale: 1, offsetX: 0, offsetY: 0.004, aspect: 3.48 },
    tryOn: true,
  },
  {
    id: 'po3318v',
    code: 'PO3318V',
    name: 'Indigo Optical',
    brand: 'Persol',
    category: 'Vue',
    image: require('../assets/products/persol/po3318v-front.webp'),
    arImage: require('../assets/products/persol/po3318v-front.webp'),
    color: '#C9DADB',
    description: 'Une monture optique bleu indigo au dessin doux et contemporain.',
    measurements: m(51, 21, 145),
    ar: { scale: 1, offsetX: 0, offsetY: 0.002, aspect: 3.35 },
    tryOn: true,
  },
  {
    id: 'po3342s',
    code: 'PO3342S',
    name: 'Polar Noir',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po3342s-front.webp'),
    arImage: require('../assets/products/persol/po3342s-front.webp'),
    color: '#BECBC7',
    description: 'Une monture enveloppante noire aux verres verts polarisés.',
    measurements: m(63, 14, 135),
    ar: { scale: 1.08, offsetX: 0, offsetY: 0.012, aspect: 3.58 },
    tryOn: true,
  },
  {
    id: 'po3396s',
    code: 'PO3396S',
    name: 'Noir Dégradé',
    brand: 'Persol',
    category: 'Solaire',
    image: require('../assets/products/persol/po3396s-front.webp'),
    arImage: require('../assets/products/persol/po3396s-front.webp'),
    color: '#D0C8C4',
    description: 'Acétate noir et verres gris dégradés polarisés.',
    measurements: m(53, 20, 145),
    ar: { scale: 1.01, offsetX: 0, offsetY: 0.005, aspect: 3.5 },
    tryOn: true,
  },
  {
    id: 'po3007v',
    code: 'PO3007V',
    name: 'Olive Optical',
    brand: 'Persol',
    category: 'Vue',
    image: require('../assets/products/persol/po3007v-front.webp'),
    arImage: require('../assets/products/persol/po3007v-front.webp'),
    color: '#D4DDCA',
    description: 'Une monture optique olive transparente, légère et polyvalente.',
    measurements: m(52, 19, 145),
    ar: { scale: 1, offsetX: 0, offsetY: 0.004, aspect: 3.36 },
    tryOn: true,
  },
];

export const accessories: CatalogueItem[] = [
  {
    id: 'accessory-cleaning',
    code: 'LOZA-CARE-01',
    name: 'Cleaning Kit',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/cleaning-kit.webp'),
    color: '#D6E0DE',
    description: 'Le nécessaire quotidien pour nettoyer et protéger vos lunettes.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
  {
    id: 'accessory-suede',
    code: 'LOZA-CASE-01',
    name: 'Exclusive Suede Case',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/exclusive-suede-case.webp'),
    color: '#E1D4C5',
    description: 'Un étui premium à la finition douce et protectrice.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
  {
    id: 'accessory-black',
    code: 'LOZA-CASE-02',
    name: 'Leather Case Black',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/leather-case-black.webp'),
    color: '#C6C7C4',
    description: 'Un étui en cuir noir au style classique.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
  {
    id: 'accessory-brown',
    code: 'LOZA-CASE-03',
    name: 'Leather Case Brown',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/leather-case-brown.webp'),
    color: '#DEC7B0',
    description: 'Un étui brun élégant pour protéger votre monture.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
  {
    id: 'accessory-strap',
    code: 'LOZA-STRAP-01',
    name: 'Leather Strap Kit',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/leather-strap-kit.webp'),
    color: '#DDC7AA',
    description: 'Un cordon en cuir pensé pour le confort et le style.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
  {
    id: 'accessory-travel',
    code: 'LOZA-TRAVEL-01',
    name: 'Travel Foldable Case',
    brand: 'Loza',
    category: 'Accessoire',
    image: require('../assets/accessories/travel-foldable-case.webp'),
    color: '#CFCEC0',
    description: 'Un étui pliable compact pour vos déplacements.',
    measurements: m(0, 0, 0),
    ar: { scale: 1, offsetX: 0, offsetY: 0, aspect: 3.4 },
  },
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
