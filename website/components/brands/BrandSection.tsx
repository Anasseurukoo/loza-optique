"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const brands = [
  {
    name: "PERSOL",
    description: "Élégance italienne et savoir-faire iconique.",
    href: "/#collections",
  },
];

export default function BrandSection() {
  return (
    <section
      id="brands"
      className="overflow-hidden bg-[#071d22] px-6 py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-[#d6bd82]">
              <Sparkles size={15} />
              Sélection multimarque
            </div>

            <h2 className="mt-6 text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl [font-family:Georgia,serif]">
              Découvrez nos marques,
              <span className="block italic text-[#d6bd82]">
                puis trouvez votre monture.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Explorez les collections disponibles chez Loza Optique. Les
              modèles et les marques peuvent varier selon les arrivages en
              boutique.
            </p>
          </div>

          <Link
            href="/#collections"
            className="inline-flex w-fit items-center gap-3 border-b border-[#d6bd82] pb-2 text-sm font-semibold text-[#d6bd82] transition hover:gap-5"
          >
            Voir les collections
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {brands.map((brand) => (
            <motion.article
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75 }}
              className="group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#103943]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,189,130,0.24),transparent_42%)]" />

              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#d6bd82]/20" />
              <div className="absolute -right-4 -top-4 h-36 w-36 rounded-full border border-[#d6bd82]/15" />

              <div className="relative flex h-full min-h-[330px] flex-col justify-between p-8 sm:p-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                    Maison sélectionnée
                  </p>

                  <h3 className="mt-8 text-4xl tracking-[0.18em] text-[#d6bd82] sm:text-5xl">
                    {brand.name}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-white/65 sm:text-base">
                    {brand.description}
                  </p>
                </div>

                <Link
                  href={brand.href}
                  className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition duration-300 group-hover:border-[#d6bd82] group-hover:bg-[#d6bd82] group-hover:text-[#071d22]"
                >
                  Découvrir la sélection
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="flex min-h-[330px] flex-col justify-between rounded-[2rem] border border-[#d6bd82]/25 bg-[#f6f1e7] p-8 text-[#102f36] sm:p-10"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a27d38]">
                En boutique
              </p>

              <h3 className="mt-7 text-3xl font-normal leading-tight sm:text-4xl [font-family:Georgia,serif]">
                D’autres maisons sont disponibles selon les arrivages.
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#526b6c] sm:text-base">
                Contactez Loza Optique ou rendez-vous directement en magasin
                pour connaître les collections actuellement disponibles.
              </p>
            </div>

            <Link
              href="/#contact"
              className="mt-10 inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#a27d38] transition hover:gap-5"
            >
              Contacter la boutique
              <ArrowRight size={16} />
            </Link>
          </motion.article>
        </div>

        <div className="mt-12 border-y border-white/10 py-7">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center text-xs uppercase tracking-[0.24em] text-white/45 sm:justify-between">
            <span>Choisissez une marque</span>
            <span className="hidden text-[#d6bd82] sm:inline">→</span>
            <span>Homme ou Femme</span>
            <span className="hidden text-[#d6bd82] sm:inline">→</span>
            <span>Découvrez les modèles</span>
          </div>
        </div>
      </div>
    </section>
  );
}