"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  CalendarDays,
  Glasses,
  ScanFace,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AppointmentModal from "../appointment/AppointmentModal";
import { withBasePath } from "../../lib/site";

const trustItems = [
  {
    title: "Conseil personnalisé",
    icon: UserRoundCheck,
  },
  {
    title: "Mesure précise",
    icon: ScanFace,
  },
  {
    title: "Ajustement en magasin",
    icon: Glasses,
  },
];

export default function Hero() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-[#f6f1e7] pt-20 text-[#102f36]"
      >
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="order-2 flex items-center px-6 py-14 sm:px-10 lg:order-1 lg:px-16 xl:px-24"
          >
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#a27d38]">
                Opticien à Casablanca depuis 1998
              </p>

              <h1 className="mt-6 text-5xl font-normal leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.4rem] [font-family:Georgia,serif]">
                Votre regard,
                <span className="block text-[#a27d38]">
                  notre précision.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-[#526b6c] sm:text-lg">
                Des montures d’exception, une sélection multimarque et un
                accompagnement sur mesure pour une vision parfaitement adaptée
                à votre quotidien.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#collections"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#103943] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#071d22]"
                >
                  Découvrir les collections
                  <ArrowDownRight size={17} />
                </Link>

                <button
                  type="button"
                  onClick={() => setAppointmentOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#a27d38]/60 bg-transparent px-7 py-4 text-sm font-semibold text-[#a27d38] transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <CalendarDays size={17} />
                  Prendre rendez-vous
                </button>
              </div>

              <Link
                href="/#application"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#103943] underline decoration-[#d6bd82] decoration-2 underline-offset-4"
              >
                Découvrez l’essayage AR dans notre application
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative order-1 min-h-[40vh] overflow-hidden lg:order-2 lg:min-h-full"
          >
            <Image
              src={withBasePath("/images/hero/hero-casablanca.webp")}
              alt="Monture Loza Optique dans une boutique premium avec vue sur Casablanca"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071d22]/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f6f1e7]/15 lg:via-transparent lg:to-transparent" />

            <div className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-[#071d22]/45 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
              Loza Optique · Casablanca
            </div>
          </motion.div>
        </div>

        <div className="border-y border-[#103943]/10 bg-white/65 px-4 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-3">
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex min-h-20 items-center justify-center gap-2 px-2 text-center text-[10px] font-medium text-[#102f36] sm:gap-3 sm:text-sm ${
                    index !== trustItems.length - 1
                      ? "border-r border-[#103943]/10"
                      : ""
                  }`}
                >
                  <Icon
                    size={18}
                    className="shrink-0 text-[#a27d38]"
                  />
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </>
  );
}
