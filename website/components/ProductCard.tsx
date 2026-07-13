"use client";

import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  variant: "round" | "square" | "aviator" | "cat-eye";
  dark?: boolean;
};

export default function ProductCard({
  name,
  category,
  price,
  variant,
  dark = false,
}: ProductCardProps) {
  const frameStyles = {
    round: "rounded-[48%]",
    square: "rounded-2xl",
    aviator: "rounded-[45%_45%_55%_55%]",
    "cat-eye": "rounded-[55%_40%_45%_50%]",
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group overflow-hidden rounded-[2rem] border shadow-sm ${
        dark
          ? "border-white/10 bg-[#103943] text-white"
          : "border-[#103943]/10 bg-white text-[#102f36]"
      }`}
    >
      <div
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden ${
          dark ? "bg-[#0a2a31]" : "bg-[#ece5d8]"
        }`}
      >
        <button
          type="button"
          aria-label={`Ajouter ${name} aux favoris`}
          className={`absolute right-5 top-5 rounded-full p-3 transition ${
            dark
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-white text-[#103943] hover:scale-105"
          }`}
        >
          <Heart size={18} />
        </button>

        <div className="relative h-28 w-[78%] max-w-sm transition duration-500 group-hover:scale-105">
          <div
            className={`absolute left-0 top-3 h-20 w-[44%] border-[7px] ${
              dark ? "border-[#d6bd82]" : "border-[#103943]"
            } ${frameStyles[variant]}`}
          />

          <div
            className={`absolute right-0 top-3 h-20 w-[44%] border-[7px] ${
              dark ? "border-[#d6bd82]" : "border-[#103943]"
            } ${frameStyles[variant]}`}
          />

          <div
            className={`absolute left-1/2 top-11 h-2 w-[14%] -translate-x-1/2 rounded-full ${
              dark ? "bg-[#d6bd82]" : "bg-[#103943]"
            }`}
          />

          <div
            className={`absolute -left-7 top-8 h-2 w-12 -rotate-12 rounded-full ${
              dark ? "bg-[#d6bd82]" : "bg-[#103943]"
            }`}
          />

          <div
            className={`absolute -right-7 top-8 h-2 w-12 rotate-12 rounded-full ${
              dark ? "bg-[#d6bd82]" : "bg-[#103943]"
            }`}
          />
        </div>

        <span
          className={`absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs font-medium ${
            dark
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
            dark ? "text-[#d6bd82]" : "text-[#a27d38]"
          }`}
        >
          {category}
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p
              className={`mt-2 text-sm ${
                dark ? "text-white/60" : "text-[#6c7d7b]"
              }`}
            >
              {price}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Découvrir ${name}`}
            className={`rounded-full p-3 transition group-hover:-translate-y-1 group-hover:translate-x-1 ${
              dark
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