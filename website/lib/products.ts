export type ProductCategory = "vue" | "soleil";
export type Audience = "homme" | "femme";
export type FaceCoverage = "Petite" | "Standard" | "Generous";
export type BridgeFit = "High Bridge Fit" | "Adjustable Nosepads";

export type ProductMeasurements = {
  lensWidth: number;
  bridgeWidth: number;
  templeLength: number;
  faceCoverage: FaceCoverage;
  bridgeFit: BridgeFit;
  bestFor: string;
};

export type ARCalibration = {
  opticalWidthMm: number;
  scaleCorrection: number;
  verticalOffset: number;
  rotationOffset: number;
  status: "ready-for-camera-calibration" | "validated";
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  reference: string;
  modelCode: string;
  category: ProductCategory;
  audience: Audience[];
  images: string[];
  color: string;
  badge?: string;
  description: string;
  features: string[];
  frameColor: string;
  frameMaterial: string;
  lensColor: string;
  lensMaterial: string;
  madeIn: string;
  measurements: ProductMeasurements;
  ar: ARCalibration;
};

export type Accessory = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
};

const arFromSize = (
  lensWidth: number,
  bridgeWidth: number,
): ARCalibration => ({
  opticalWidthMm: lensWidth * 2 + bridgeWidth,
  scaleCorrection: 1,
  verticalOffset: 0,
  rotationOffset: 0,
  status: "ready-for-camera-calibration",
});

export const products: Product[] = [
  {
    id: 1,
    slug: "alpine-signature",
    name: "Alpine Signature",
    brand: "Persol",
    reference: "PO2496SZ",
    modelCode: "PO2496SZ",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po2496sz-front.webp",
      "/images/products/persol-alpine-sun.webp",
      "/images/lifestyle/persol-alpine-men.webp",
      "/images/lifestyle/persol-alpine-women.webp",
    ],
    color: "Doré · Verres verts",
    badge: "Signature",
    description:
      "Une monture ronde en métal doré au caractère iconique, complétée par des verres verts et des détails textiles distinctifs.",
    features: [
      "Monture métal",
      "Verres en cristal",
      "Plaquettes ajustables",
      "Fabrication italienne",
    ],
    frameColor: "Gold",
    frameMaterial: "Metal",
    lensColor: "Green",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 52,
      bridgeWidth: 18,
      templeLength: 140,
      faceCoverage: "Standard",
      bridgeFit: "Adjustable Nosepads",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(52, 18),
  },
  {
    id: 2,
    slug: "noir-or",
    name: "Noir & Or",
    brand: "Persol",
    reference: "PO3264S",
    modelCode: "PO3264S",
    category: "soleil",
    audience: ["homme"],
    images: [
      "/images/products/persol/po3264s-front.webp",
      "/images/products/persol/po3264s-angle.webp",
    ],
    color: "Noir / Or · Verres noirs polarisés",
    badge: "Polarisé",
    description:
      "Une monture ronde noire rehaussée d’un pont doré, pensée pour un style masculin précis et contemporain.",
    features: [
      "Acétate et métal",
      "Verres noirs polarisés",
      "Plaquettes ajustables",
      "Fabrication italienne",
    ],
    frameColor: "Black / Gold",
    frameMaterial: "Acetate / Metal",
    lensColor: "Black Polarized",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 50,
      bridgeWidth: 22,
      templeLength: 140,
      faceCoverage: "Standard",
      bridgeFit: "Adjustable Nosepads",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(50, 22),
  },
  {
    id: 3,
    slug: "or-violet",
    name: "Or Violet",
    brand: "Persol",
    reference: "PO1019S",
    modelCode: "PO1019S",
    category: "soleil",
    audience: ["femme"],
    images: [
      "/images/products/persol/po1019s-front.webp",
      "/images/products/persol/po1019s-angle.webp",
    ],
    color: "Doré · Verres violets",
    badge: "Élégance",
    description:
      "Une monture ronde dorée aux verres violets, légère et raffinée, avec des branches mêlant métal et acétate.",
    features: [
      "Métal et acétate",
      "Verres violets en cristal",
      "Plaquettes ajustables",
      "Fabrication italienne",
    ],
    frameColor: "Gold",
    frameMaterial: "Metal Acetate",
    lensColor: "Violet",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 53,
      bridgeWidth: 20,
      templeLength: 140,
      faceCoverage: "Standard",
      bridgeFit: "Adjustable Nosepads",
      bestFor: "Visages larges",
    },
    ar: arFromSize(53, 20),
  },
  {
    id: 4,
    slug: "havane-solaire",
    name: "Havane Solaire",
    brand: "Persol",
    reference: "PO3393S",
    modelCode: "PO3393S",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po3393s-front.webp",
      "/images/products/persol-tortoise-sun.webp",
    ],
    color: "Havane · Verres verts",
    badge: "3D Ready",
    description:
      "Une monture solaire havane généreuse, structurée par un double pont et associée à des verres verts en cristal.",
    features: [
      "Acétate havane",
      "Verres verts en cristal",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Havana",
    frameMaterial: "Acetate",
    lensColor: "Green",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 56,
      bridgeWidth: 20,
      templeLength: 145,
      faceCoverage: "Generous",
      bridgeFit: "High Bridge Fit",
      bestFor: "Visages larges",
    },
    ar: arFromSize(56, 20),
  },
  {
    id: 5,
    slug: "ida-doree",
    name: "Ida Dorée",
    brand: "Persol",
    reference: "PO1018S",
    modelCode: "PO1018S",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po1018s-front.webp",
      "/images/products/persol-gold-sun.webp",
    ],
    color: "Doré · Verres verts polarisés",
    badge: "Polarisé",
    description:
      "Une monture fine en métal doré, équilibrée par des verres verts polarisés et des branches en acétate.",
    features: [
      "Métal et acétate",
      "Verres verts polarisés",
      "Plaquettes ajustables",
      "Fabrication italienne",
    ],
    frameColor: "Gold",
    frameMaterial: "Metal Acetate",
    lensColor: "Polarized Green",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 52,
      bridgeWidth: 21,
      templeLength: 145,
      faceCoverage: "Petite",
      bridgeFit: "Adjustable Nosepads",
      bestFor: "Visages larges",
    },
    ar: arFromSize(52, 21),
  },
  {
    id: 6,
    slug: "indigo-optical",
    name: "Indigo Optical",
    brand: "Persol",
    reference: "PO3318V",
    modelCode: "PO3318V",
    category: "vue",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po3318v-front.webp",
      "/images/products/persol-blue-optical.webp",
    ],
    color: "Cobalto · Verres optiques",
    description:
      "Une monture optique en acétate bleu cobalto, équilibrée et polyvalente pour un usage quotidien.",
    features: [
      "Acétate cobalto",
      "Monture optique",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Cobalto",
    frameMaterial: "Acetate",
    lensColor: "Clear",
    lensMaterial: "Non précisé",
    madeIn: "Italie",
    measurements: {
      lensWidth: 51,
      bridgeWidth: 21,
      templeLength: 145,
      faceCoverage: "Standard",
      bridgeFit: "High Bridge Fit",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(51, 21),
  },
  {
    id: 7,
    slug: "noir-carre",
    name: "Noir Carré",
    brand: "Persol",
    reference: "PO3269S",
    modelCode: "PO3269S",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po3269s-front.webp",
      "/images/products/persol-black-square.webp",
      "/images/lifestyle/persol-men-black-square.webp",
      "/images/lifestyle/persol-women-black-square.webp",
    ],
    color: "Noir · Verres gris foncé",
    description:
      "Une silhouette carrée noire, sobre et contemporaine, complétée par des verres gris foncé en cristal.",
    features: [
      "Acétate noir",
      "Verres gris foncé",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Black",
    frameMaterial: "Acetate",
    lensColor: "Dark Grey",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 52,
      bridgeWidth: 20,
      templeLength: 145,
      faceCoverage: "Standard",
      bridgeFit: "High Bridge Fit",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(52, 20),
  },
  {
    id: 8,
    slug: "noir-degrade",
    name: "Noir Dégradé",
    brand: "Persol",
    reference: "PO3396S",
    modelCode: "PO3396S",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po3396s-front.webp",
      "/images/products/persol-black-gradient.webp",
    ],
    color: "Noir · Verres gris dégradés polarisés",
    badge: "Polarisé",
    description:
      "Une monture noire structurée avec des verres gris dégradés polarisés pour un rendu urbain et élégant.",
    features: [
      "Acétate noir",
      "Verres dégradés polarisés",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Black",
    frameMaterial: "Acetate",
    lensColor: "Gradient Grey Polarized",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 53,
      bridgeWidth: 20,
      templeLength: 145,
      faceCoverage: "Standard",
      bridgeFit: "High Bridge Fit",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(53, 20),
  },
  {
    id: 9,
    slug: "polar-noir",
    name: "Polar Noir",
    brand: "Persol",
    reference: "PO3342S",
    modelCode: "PO3342S",
    category: "soleil",
    audience: ["homme"],
    images: [
      "/images/products/persol/po3342s-front.webp",
      "/images/products/persol-black-sun.webp",
    ],
    color: "Noir · Verres verts polarisés",
    badge: "Polarisé",
    description:
      "Une monture solaire noire à large couverture, conçue pour un style affirmé et une protection quotidienne.",
    features: [
      "Acétate noir",
      "Verres verts polarisés",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Black",
    frameMaterial: "Acetate",
    lensColor: "Polarized Green",
    lensMaterial: "Crystal",
    madeIn: "Italie",
    measurements: {
      lensWidth: 63,
      bridgeWidth: 14,
      templeLength: 135,
      faceCoverage: "Standard",
      bridgeFit: "High Bridge Fit",
      bestFor: "Visages larges",
    },
    ar: arFromSize(63, 14),
  },
  {
    id: 10,
    slug: "sauge-optical",
    name: "Sauge Optical",
    brand: "Persol",
    reference: "PO3007V",
    modelCode: "PO3007V",
    category: "vue",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol/po3007v-front.webp",
      "/images/products/persol-green-optical.webp",
    ],
    color: "Olive transparent · Verres optiques",
    description:
      "Une monture optique en acétate olive transparent, douce et contemporaine, adaptée aux visages plus fins.",
    features: [
      "Acétate olive transparent",
      "Monture optique",
      "High Bridge Fit",
      "Fabrication italienne",
    ],
    frameColor: "Olive Transparent",
    frameMaterial: "Acetate",
    lensColor: "Clear",
    lensMaterial: "Non précisé",
    madeIn: "Italie",
    measurements: {
      lensWidth: 52,
      bridgeWidth: 19,
      templeLength: 145,
      faceCoverage: "Petite",
      bridgeFit: "High Bridge Fit",
      bestFor: "La plupart des visages",
    },
    ar: arFromSize(52, 19),
  },
];

export const accessories: Accessory[] = [
  {
    id: 1,
    slug: "cleaning-kit",
    name: "Cleaning Kit",
    image: "/images/accessories/cleaning-kit.webp",
    description: "Kit complet pour nettoyer et protéger vos lunettes.",
  },
  {
    id: 2,
    slug: "exclusive-suede-case",
    name: "Exclusive Suede Case",
    image: "/images/accessories/exclusive-suede-case.webp",
    description: "Étui premium avec finition douce.",
  },
  {
    id: 3,
    slug: "leather-case-black",
    name: "Leather Case Black",
    image: "/images/accessories/leather-case-black.webp",
    description: "Étui noir classique pour protéger votre monture.",
  },
  {
    id: 4,
    slug: "leather-case-brown",
    name: "Leather Case Brown",
    image: "/images/accessories/leather-case-brown.webp",
    description: "Étui brun à la finition élégante.",
  },
  {
    id: 5,
    slug: "leather-strap-kit",
    name: "Leather Strap Kit",
    image: "/images/accessories/leather-strap-kit.webp",
    description: "Cordon et accessoires assortis.",
  },
  {
    id: 6,
    slug: "polarized-clip-on",
    name: "Polarized Clip-On",
    image: "/images/accessories/polarized-clip-on.webp",
    description: "Clip solaire pratique pour monture optique.",
  },
  {
    id: 7,
    slug: "premium-care-kit",
    name: "Premium Care Kit",
    image: "/images/accessories/premium-care-kit.webp",
    description: "Ensemble premium pour l’entretien quotidien.",
  },
  {
    id: 8,
    slug: "travel-foldable-case",
    name: "Travel Foldable Case",
    image: "/images/accessories/travel-foldable-case.webp",
    description: "Étui pliable, compact et facile à transporter.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

