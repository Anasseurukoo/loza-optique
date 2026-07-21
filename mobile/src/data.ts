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
  yawResponse: number;
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
  accent: string;
  description: string;
  fit: string;
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

const ar = (
  aspect: number,
  scale = 1,
  offsetY = 0,
  yawResponse = 0.2,
): ArCalibration => ({ scale, offsetX: 0, offsetY, aspect, yawResponse });

export const eyewear: CatalogueItem[] = [
  {
    id: 'po2496sz', code: 'PO2496SZ', name: 'Alpine Signature', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po2496sz-front.webp'),
    arImage: require('../assets/ar/po2496sz-front.webp'),
    color: '#E4D8BD', accent: '#8B6A2C',
    description: 'Une monture ronde en métal, inspirée de l’héritage alpin de Persol.',
    fit: 'Équilibre classique · pont ajustable', measurements: m(52, 18, 140),
    ar: ar(1.949, 1.01, -0.01, 0.18), tryOn: true,
  },
  {
    id: 'po1019s', code: 'PO1019S', name: 'Or Violet', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po1019s-front.webp'),
    arImage: require('../assets/ar/po1019s-front.webp'),
    color: '#E9DCDD', accent: '#83576F',
    description: 'Métal doré et verres violets pour une silhouette fine et lumineuse.',
    fit: 'Léger · idéal visages moyens à larges', measurements: m(53, 20, 140),
    ar: ar(2.099, 1, -0.008, 0.18), tryOn: true,
  },
  {
    id: 'po1018s', code: 'PO1018S', name: 'Ida Dorée', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po1018s-front.webp'),
    arImage: require('../assets/ar/po1018s-front.webp'),
    color: '#E6D9B8', accent: '#756230',
    description: 'Une monture ronde dorée aux verres verts polarisés.',
    fit: 'Fine · plaquettes ajustables', measurements: m(52, 21, 145),
    ar: ar(2.364, 1, -0.006, 0.17), tryOn: true,
  },
  {
    id: 'po3393s', code: 'PO3393S', name: 'Havane Solaire', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po3393s-front.webp'),
    arImage: require('../assets/ar/po3393s-front.webp'),
    color: '#E3CBB8', accent: '#7C4D35',
    description: 'Acétate havane, double pont et verres verts au caractère affirmé.',
    fit: 'Généreuse · visages moyens à larges', measurements: m(56, 20, 145),
    ar: ar(2.321, 1.03, 0.004, 0.24), tryOn: true,
  },
  {
    id: 'po3264s', code: 'PO3264S', name: 'Noir & Or', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po3264s-front.webp'),
    arImage: require('../assets/ar/po3264s-front.webp'),
    color: '#D3D5D1', accent: '#5A4B38',
    description: 'Une construction noire et dorée avec un pont architectural.',
    fit: 'Pont ajustable · silhouette structurée', measurements: m(50, 22, 140),
    ar: ar(2.006, 0.99, -0.006, 0.2), tryOn: true,
  },
  {
    id: 'po3269s', code: 'PO3269S', name: 'Noir Carré', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po3269s-front.webp'),
    arImage: require('../assets/ar/po3269s-front.webp'),
    color: '#D4D0CB', accent: '#3A4141',
    description: 'Une forme carrée noire, équilibrée et facile à porter.',
    fit: 'Standard · lignes franches', measurements: m(52, 20, 145),
    ar: ar(2.097, 1, 0.004, 0.22), tryOn: true,
  },
  {
    id: 'po3318v', code: 'PO3318V', name: 'Indigo Optical', brand: 'Persol', category: 'Vue',
    image: require('../assets/products/persol/po3318v-front.webp'),
    arImage: require('../assets/ar/po3318v-front.webp'),
    color: '#CFDEE0', accent: '#355D6E',
    description: 'Une monture optique bleu indigo au dessin doux et contemporain.',
    fit: 'Quotidien · pont haut', measurements: m(51, 21, 145),
    ar: ar(2.134, 1, 0.002, 0.2), tryOn: true,
  },
  {
    id: 'po3342s', code: 'PO3342S', name: 'Polar Noir', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po3342s-front.webp'),
    arImage: require('../assets/ar/po3342s-front.webp'),
    color: '#C8D4D0', accent: '#294D47',
    description: 'Une monture enveloppante noire aux verres verts polarisés.',
    fit: 'Large couverture · sport chic', measurements: m(63, 14, 135),
    ar: ar(2.061, 1.04, 0.012, 0.28), tryOn: true,
  },
  {
    id: 'po3396s', code: 'PO3396S', name: 'Noir Dégradé', brand: 'Persol', category: 'Solaire',
    image: require('../assets/products/persol/po3396s-front.webp'),
    arImage: require('../assets/ar/po3396s-front.webp'),
    color: '#D8D0CC', accent: '#5A5050',
    description: 'Acétate noir et verres gris dégradés polarisés.',
    fit: 'Standard · couverture confortable', measurements: m(53, 20, 145),
    ar: ar(2.301, 1.01, 0.005, 0.22), tryOn: true,
  },
  {
    id: 'po3007v', code: 'PO3007V', name: 'Olive Optical', brand: 'Persol', category: 'Vue',
    image: require('../assets/products/persol/po3007v-front.webp'),
    arImage: require('../assets/ar/po3007v-front.webp'),
    color: '#D9E1CF', accent: '#617151',
    description: 'Une monture optique olive transparente, légère et polyvalente.',
    fit: 'Souple · visages fins à moyens', measurements: m(52, 19, 145),
    ar: ar(1.88, 1, 0.004, 0.2), tryOn: true,
  },
];

export const accessories: CatalogueItem[] = [
  {
    id: 'accessory-cleaning', code: 'LOZA-CARE-01', name: 'Cleaning Ritual', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/cleaning-kit.webp'), color: '#D6E0DE', accent: '#315A58',
    description: 'Le nécessaire quotidien pour nettoyer et protéger vos lunettes.', fit: 'Entretien', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-suede', code: 'LOZA-CASE-01', name: 'Suede Case', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/exclusive-suede-case.webp'), color: '#E1D4C5', accent: '#72563B',
    description: 'Un étui premium à la finition douce et protectrice.', fit: 'Protection', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-black', code: 'LOZA-CASE-02', name: 'Noir Leather', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/leather-case-black.webp'), color: '#C9CAC7', accent: '#383B3B',
    description: 'Un étui noir à la présence discrète et élégante.', fit: 'Protection', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-brown', code: 'LOZA-CASE-03', name: 'Siena Leather', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/leather-case-brown.webp'), color: '#DEC7B0', accent: '#79563A',
    description: 'Un étui brun élégant pour protéger votre monture.', fit: 'Protection', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-strap', code: 'LOZA-STRAP-01', name: 'Leather Strap', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/leather-strap-kit.webp'), color: '#DDC7AA', accent: '#775C37',
    description: 'Un cordon en cuir pensé pour le confort et le style.', fit: 'Style', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-travel', code: 'LOZA-TRAVEL-01', name: 'Travel Fold', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/travel-foldable-case.webp'), color: '#D5D4C7', accent: '#5F6251',
    description: 'Un étui pliable compact pour vos déplacements.', fit: 'Voyage', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-clip', code: 'LOZA-CLIP-01', name: 'Polarized Clip', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/polarized-clip-on.webp'), color: '#CED8D5', accent: '#294D47',
    description: 'Un clip solaire polarisé pour passer de la vue au soleil en un geste.', fit: 'Modulaire', measurements: m(0, 0, 0), ar: ar(2),
  },
  {
    id: 'accessory-care', code: 'LOZA-CARE-02', name: 'Premium Care', brand: 'Loza', category: 'Accessoire',
    image: require('../assets/accessories/premium-care-kit.webp'), color: '#DDD1BC', accent: '#745B35',
    description: 'Le coffret complet pour préserver monture, verres et finitions.', fit: 'Entretien premium', measurements: m(0, 0, 0), ar: ar(2),
  },
];

export const catalogue = [...eyewear, ...accessories];

export const lifestyle = [
  { id: 'l1', title: 'Alpine · Homme', image: require('../assets/lifestyle/persol-alpine-men.webp') },
  { id: 'l2', title: 'Alpine · Femme', image: require('../assets/lifestyle/persol-alpine-women.webp') },
  { id: 'l3', title: 'Noir carré · Homme', image: require('../assets/lifestyle/persol-men-black-square.webp') },
  { id: 'l4', title: 'Carrée · Homme', image: require('../assets/lifestyle/persol-men-square.webp') },
  { id: 'l5', title: 'Noir carré · Femme', image: require('../assets/lifestyle/persol-women-black-square.webp') },
  { id: 'l6', title: 'Carrée · Femme', image: require('../assets/lifestyle/persol-women-square.webp') },
];
