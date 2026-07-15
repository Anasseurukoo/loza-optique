"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { withBasePath } from "../lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f6f1e7] px-6 pb-20 pt-32 text-[#102f36]">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#d6bd82]/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[#164753]/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#103943]/15 bg-white/50 px-4 py-2 backdrop-blur">
            <Sparkles size={14} className="text-[#a27d38]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a27d38]">
              Opticien à Casablanca
            </p>
          </div>

          <h1 className="text-5xl font-semibold leading-[0.93] tracking-[-0.055em] sm:text-7xl lg:text-[5.7rem]">
            La vision
            <span className="block font-light italic text-[#a27d38]">
              autrement.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#526b6c] sm:text-lg">
            Des montures sélectionnées avec précision, un conseil humain et un
            savoir-faire dédié au confort de chaque regard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#collections"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#103943] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#103943]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#071d22]"
            >
              Découvrir les collections
              <ArrowDownRight size={17} />
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#103943]/25 px-8 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:border-[#103943] hover:bg-white/60"
            >
              <CalendarDays size={17} />
              Prendre rendez-vous
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4 border-t border-[#103943]/15 pt-7 text-sm">
            <div>
              <strong className="block text-base sm:text-lg">Qualité</strong>

              <span className="mt-1 block text-xs leading-5 text-[#6c7d7b] sm:text-sm">
                Montures sélectionnées
              </span>
            </div>

            <div>
              <strong className="block text-base sm:text-lg">
                Précision
              </strong>

              <span className="mt-1 block text-xs leading-5 text-[#6c7d7b] sm:text-sm">
                Conseil personnalisé
              </span>
            </div>

            <div>
              <strong className="block text-base sm:text-lg">
                Confiance
              </strong>

              <span className="mt-1 block text-xs leading-5 text-[#6c7d7b] sm:text-sm">
                Service attentionné
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.94, x: 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <div className="group relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2.75rem] bg-[#071d22] shadow-2xl shadow-[#123a42]/25 transition duration-500 hover:-translate-y-2">
            <video
              src={withBasePath("/videos/persol-hachira.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Présentation d’une monture LOZA Optique"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#071d22]/45 via-transparent to-[#071d22]/90" />

            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

            <div className="absolute left-7 top-7 z-20 rounded-full border border-white/20 bg-[#071d22]/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-md sm:left-8 sm:top-8">
              LOZA Vision Lab
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-7 text-white sm:p-9">
              <div className="border-t border-white/25 pt-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d6bd82]">
                  Technologie & confort
                </p>

                <h2 className="mt-3 max-w-md text-2xl font-medium leading-tight sm:text-3xl">
                  L’élégance évolue avec la lumière.
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
                  Découvrez des verres conçus pour accompagner naturellement
                  les changements de luminosité, à l’intérieur comme à
                  l’extérieur.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-[#103943]/10 bg-white/90 px-5 py-4 shadow-xl backdrop-blur sm:block lg:-left-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a27d38]">
              Expérience LOZA
            </p>

            <p className="mt-1 text-sm font-semibold">
              Conseil · Mesure · Ajustement
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}