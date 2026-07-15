"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { accessories, products } from "../lib/products";
import ProductCard from "./ProductCard";

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
            Une sélection de démonstration. Les modèles définitifs seront
            remplacés par les collections réellement disponibles chez LOZA
            Optique.
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
            </button>
          ))}
        </div>

        {activeFilter === "accessoires" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {accessories.map((accessory) => (
              <article
                key={accessory.id}
                className="group overflow-hidden rounded-[1.75rem] border border-[#103943]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f3f3f1]">
                  <button
                    type="button"
                    aria-label={`Ajouter ${accessory.name} aux favoris`}
                    className="absolute right-4 top-4 z-20 rounded-full bg-white p-3 text-[#103943] shadow-sm"
                  >
                    <Heart size={17} />
                  </button>

                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-7 transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#a27d38]">
                    Accessoire
                  </p>

                  <h3 className="mt-3 text-lg font-semibold">
                    {accessory.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6c7d7b]">
                    {accessory.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}