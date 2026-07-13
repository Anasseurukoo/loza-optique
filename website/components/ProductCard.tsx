"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";

export type Product = {
  id: number;
  name: string;
  reference: string;
  category: "vue" | "soleil";
  audience: Array<"homme" | "femme">;
  image: string;
  hoverImage?: string;
  color: string;
  badge?: string;
  dark?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className={`group overflow-hidden rounded-[2rem] border shadow-sm ${
        product.dark
          ? "border-white/10 bg-[#103943] text-white"
          : "border-[#103943]/10 bg-white text-[#102f36]"
      }`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          product.dark ? "bg-[#0a2a31]" : "bg-[#eee8dc]"
        }`}
      >
        {product.badge && (
          <span
            className={`absolute left-5 top-5 z-20 rounded-full px-4 py-2 text-xs font-semibold ${
              product.dark
                ? "bg-white/10 text-white"
                : "bg-white text-[#103943]"
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label={`Ajouter ${product.name} aux favoris`}
          className={`absolute right-5 top-5 z-20 rounded-full p-3 transition hover:scale-110 ${
            product.dark
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-white text-[#103943]"
          }`}
        >
          <Heart size={18} />
        </button>

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={`object-contain p-7 transition duration-700 ${
            product.hoverImage
              ? "group-hover:scale-105 group-hover:opacity-0"
              : "group-hover:scale-110"
          }`}
        />

        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} porté`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <span
          className={`absolute bottom-5 left-5 z-20 rounded-full px-4 py-2 text-xs ${
            product.dark
              ? "bg-white/10 text-white/80"
              : "bg-white text-[#526b6c]"
          }`}
        >
          Démo
        </span>
      </div>

      <div className="p-6">
        <p
          className={`text-xs uppercase tracking-[0.25em] ${
            product.dark ? "text-[#d6bd82]" : "text-[#a27d38]"
          }`}
        >
          {product.category === "vue"
            ? "Lunettes de vue"
            : "Lunettes de soleil"}
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>

            <p
              className={`mt-1 text-sm ${
                product.dark ? "text-white/60" : "text-[#6c7d7b]"
              }`}
            >
              {product.reference}
            </p>

            <p
              className={`mt-3 text-sm ${
                product.dark ? "text-white/70" : "text-[#526b6c]"
              }`}
            >
              {product.color}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Découvrir ${product.name}`}
            className={`rounded-full p-3 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
              product.dark
                ? "bg-white/10 text-white"
                : "bg-[#103943] text-white"
            }`}
          >
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}