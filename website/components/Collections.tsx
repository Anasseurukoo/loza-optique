"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const categories = [
  "Homme",
  "Femme",
  "Lunettes de vue",
  "Lunettes de soleil",
  "Accessoires",
];

const products = [
  {
    name: "Héritage 01",
    category: "Lunettes de vue",
    price: "Prix sur demande",
    variant: "round" as const,
  },
  {
    name: "Éclat 02",
    category: "Lunettes de soleil",
    price: "Prix sur demande",
    variant: "cat-eye" as const,
  },
  {
    name: "Signature 03",
    category: "Lunettes de vue",
    price: "Prix sur demande",
    variant: "square" as const,
    dark: true,
  },
  {
    name: "Horizon 04",
    category: "Lunettes de soleil",
    price: "Prix sur demande",
    variant: "aviator" as const,
  },
];

export default function Collections() {
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
            Une première sélection de démonstration. Les modèles définitifs
            seront ajoutés après la visite du magasin et les photos des
            collections disponibles.
          </p>
        </motion.div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-3">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition ${
                index === 0
                  ? "border-[#103943] bg-[#103943] text-white"
                  : "border-[#103943]/20 bg-transparent hover:border-[#103943] hover:bg-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}