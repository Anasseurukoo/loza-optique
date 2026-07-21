"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../lib/products";
import { withBasePath } from "../lib/site";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  const mainImage = withBasePath(product.images[0]);
  const hoverImage = product.images[1]
    ? withBasePath(product.images[1])
    : undefined;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-[2rem] border border-[#103943]/10 bg-white text-[#102f36] shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#103943]/10"
    >
      <button
        type="button"
        aria-label={`Ajouter ${product.name} aux favoris`}
        aria-pressed={favorite}
        onClick={(event) => {
          event.preventDefault();
          setFavorite((current) => !current);
        }}
        className={`absolute right-5 top-5 z-30 rounded-full p-3 shadow-sm transition hover:scale-110 ${
          favorite
            ? "bg-[#103943] text-white"
            : "bg-white/90 text-[#103943]"
        }`}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#eee8dc]">
          {product.badge && (
            <span className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#103943]">
              {product.badge}
            </span>
          )}

          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-contain p-7 transition duration-700 ${
              hoverImage
                ? "group-hover:scale-105 group-hover:opacity-0"
                : "group-hover:scale-110"
            }`}
          />

          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} — vue alternative`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-7 opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a27d38]">
            Persol · {product.category === "vue"
              ? "Lunettes de vue"
              : "Lunettes de soleil"}
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#6c7d7b]">
                {product.reference}
              </p>
              <p className="mt-3 text-sm text-[#526b6c]">{product.color}</p>
              <p className="mt-2 text-xs text-[#6c7d7b]">
                {product.measurements.lensWidth}-{product.measurements.bridgeWidth}
                · {product.measurements.templeLength} mm
              </p>
            </div>

            <span className="rounded-full bg-[#103943] p-3 text-white transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
