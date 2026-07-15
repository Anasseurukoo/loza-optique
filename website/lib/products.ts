export type ProductCategory = "vue" | "soleil";
export type Audience = "homme" | "femme";

export type Product = {
  id: number;
  slug: string;
  name: string;
  reference: string;
  category: ProductCategory;
  audience: Audience[];
  images: string[];
  color: string;
  badge?: string;
  description: string;
  features: string[];
};

export type Accessory = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "alpine-signature",
    name: "Alpine Signature",
    reference: "DÉMO-001",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol-alpine-sun.webp",
      "/images/lifestyle/persol-alpine-men.webp",
      "/images/lifestyle/persol-alpine-women.webp",
    ],
    color: "Métal doré · Verres verts",
    badge: "Collection signature",
    description:
      "Une monture solaire au caractère affirmé, présentée dans cette version de démonstration pour illustrer l’expérience LOZA Optique.",
    features: [
      "Monture légère",
      "Protection solaire",
      "Style unisexe",
      "Conseil et ajustement en magasin",
    ],
  },
  {
    id: 2,
    slug: "noir-carre",
    name: "Noir Carré",
    reference: "DÉMO-002",
    category: "soleil",
    audience: ["homme", "femme"],
    images: [
      "/images/products/persol-black-square.webp",
      "/images/lifestyle/persol-men-black-square.webp",
      "/images/lifestyle/persol-women-black-square.webp",
    ],
    color: "Noir brillant · Verres fumés",
    badge: "Nouveau",
    description:
      "Une silhouette carrée et contemporaine pensée pour un style sobre, précis et facile à porter.",
    features: [
      "Forme carrée",
      "Style unisexe",
      "Verres solaires",
      "Ajustement personnalisé",
    ],
  },
  {
    id: 3,
    slug: "ida-doree",
    name: "Ida Dorée",
    reference: "DÉMO-003",
    category: "soleil",
    audience: ["homme", "femme"],
    images: ["/images/products/persol-gold-sun.webp"],
    color: "Métal doré · Verres gris",
    description:
      "Une monture fine et élégante, idéale pour présenter une sélection solaire raffinée.",
    features: [
      "Métal doré",
      "Monture légère",
      "Style mixte",
      "Disponible sur demande",
    ],
  },
  {
    id: 4,
    slug: "indigo-optical",
    name: "Indigo Optical",
    reference: "DÉMO-004",
    category: "vue",
    audience: ["homme", "femme"],
    images: ["/images/products/persol-blue-optical.webp"],
    color: "Acétate bleu · Verres optiques",
    description:
      "Une monture optique bleue destinée à illustrer la collection lunettes de vue.",
    features: [
      "Monture optique",
      "Acétate bleu",
      "Conseil morphologique",
      "Montage en magasin",
    ],
  },
  {
    id: 5,
    slug: "sauge-optical",
    name: "Sauge Optical",
    reference: "DÉMO-005",
    category: "vue",
    audience: ["homme", "femme"],
    images: ["/images/products/persol-green-optical.webp"],
    color: "Acétate vert sauge · Verres optiques",
    description:
      "Une monture transparente aux nuances vert sauge, douce et contemporaine.",
    features: [
      "Acétate transparent",
      "Monture optique",
      "Style contemporain",
      "Réglage personnalisé",
    ],
  },
  {
    id: 6,
    slug: "havane-solaire",
    name: "Havane Solaire",
    reference: "DÉMO-006",
    category: "soleil",
    audience: ["homme", "femme"],
    images: ["/images/products/persol-tortoise-sun.webp"],
    color: "Écaille havane · Verres verts",
    description:
      "Une monture solaire écaille au style intemporel et chaleureux.",
    features: [
      "Finition écaille",
      "Verres solaires",
      "Style intemporel",
      "Disponible sur demande",
    ],
  },
  {
    id: 7,
    slug: "polar-noir",
    name: "Polar Noir",
    reference: "DÉMO-007",
    category: "soleil",
    audience: ["homme"],
    images: ["/images/products/persol-black-sun.webp"],
    color: "Noir · Verres verts",
    badge: "Polarisé",
    description:
      "Une monture solaire noire au design affirmé, pensée pour un usage quotidien.",
    features: [
      "Design masculin",
      "Verres solaires",
      "Monture noire",
      "Ajustement en magasin",
    ],
  },
  {
    id: 8,
    slug: "noir-degrade",
    name: "Noir Dégradé",
    reference: "DÉMO-008",
    category: "soleil",
    audience: ["homme", "femme"],
    images: ["/images/products/persol-black-gradient.webp"],
    color: "Noir brillant · Verres dégradés",
    description:
      "Une monture noire structurée avec des verres dégradés pour un rendu urbain et élégant.",
    features: [
      "Verres dégradés",
      "Monture structurée",
      "Style unisexe",
      "Disponible sur demande",
    ],
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