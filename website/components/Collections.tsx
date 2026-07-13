"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProductCard, { Product } from "./ProductCard";

type Filter =
  | "tous"
  | "homme"
  | "femme"
  | "vue"
  | "soleil"
  | "accessoires";

const filters: Array<{ id: Filter; label: string }> = [
  { id: "tous", label: "Tous" },
  { id: "homme", label: "Homme" },
  { id: "femme", label: "Femme" },
  { id: "vue", label: "Lunettes de vue" },
  { id: "soleil", label: "Lunettes de soleil" },
  { id: "accessoires", label: "Accessoires" },
];

const products: Product[] = [
  {
    id: 1,
    name: "Ida",
    reference: "PO1018S",
    category: "soleil",
    audience: ["homme", "femme"],
    image: "/images/products/persol-gold-sun.webp",
    hoverImage: "/images/lifestyle/persol-men-alpine.webp",
    color: "Métal doré · Verres gris",
    badge: "Signature",
  },
  {
    id: 2,
    name: "Terra",
    reference: "PO3218V",
    category: "vue",
    audience: ["homme", "femme"],
    image: "/images/products/persol-blue-optical.webp",
    color: "Acétate bleu · Verres optiques",
  },
  {
    id: 3,
    name: "Horizon",
    reference: "PO3235S",
    category: "soleil",
    audience: ["homme", "femme"],
    image: "/images/products/persol-tortoise-sun.webp",
    hoverImage: "/images/lifestyle/persol-women-round.webp",
    color: "Écaille havane · Verres verts",
    dark: true,
  },
  {
    id: 4,
    name: "Verde",
    reference: "PO3391V",
    category: "vue",
    audience: ["homme", "femme"],
    image: "/images/products/persol-green-optical.webp",
    color: "Acétate vert sauge · Verres optiques",
  },
  {
    id: 5,
    name: "Noir P",
    reference: "PO2803S",
    category: "soleil",
    audience: ["homme"],
    image: "/images/products/persol-black-sun.webp",
    hoverImage: "/images/lifestyle/persol-men-round.webp",
    color: "Noir brillant · Verres polarisés",
    badge: "Polarized",
  },
  {
    id: 6,
    name: "Cinema",
    reference: "PO3396S",
    category: "soleil",
    audience: ["homme", "femme"],
    image: "/images/products/persol-black-gradient.webp",
    hoverImage: "/images/lifestyle/persol-women-alpine.webp",
    color: "Noir · Verres dégradés",
  },
];

export default function Collections() {
  const [activeFilter, setActiveFilter] = useState<Filter>("tous");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "tous") {
      return products;
    }

    if (activeFilter === "homme" || activeFilter === "femme") {
      return products.filter((product) =>
        product.audience.includes(activeFilter),
      );
    }

    if (activeFilter === "vue" || activeFilter === "soleil") {
      return products.filter(
        (product) => product.category === activeFilter,
      );
    }

    return [];
  }, [activeFilter]);

  return (
    <section
      id="collections"
      className="bg-[#ede6d9] px-6 py-24 text-[#102f36] sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#a27d38]">
              Sélection LOZA
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Des montures pour
              <span className="block font-light italic text-[#a27d38]">
                chaque regard.
              </span>
            </h2>
          </div>

          <p className="max-w-md leading-7 text-[#526b6c]">
            Une sélection de démonstration destinée à présenter l’expérience
            digitale de LOZA Optique. Les collections définitives seront
            ajoutées avec les produits réellement disponibles en magasin.
          </p>
        </motion.div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition ${
                activeFilter === filter.id
                  ? "border-[#103943] bg-[#103943] text-white"
                  : "border-[#103943]/20 hover:border-[#103943] hover:bg-white/50"
              }`}
            >
              {filter.label}

              {filter.id === "accessoires" && (
                <span className="ml-2 text-[10px] opacity-60">
                  Bientôt
                </span>
              )}
            </button>
          ))}
        </div>

        {activeFilter === "accessoires" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-[2rem] border border-[#103943]/10 bg-white/50 px-8 py-20 text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#a27d38]">
              Accessoires
            </p>

            <h3 className="mt-5 text-3xl font-semibold">
              Étuis, kits d’entretien et cordons
            </h3>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#526b6c]">
              Cette sélection sera ajoutée après confirmation des accessoires
              disponibles chez LOZA Optique.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}