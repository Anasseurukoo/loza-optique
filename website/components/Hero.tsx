"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  CalendarDays,
  Camera,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { withBasePath } from "../lib/site";

const trustItems = [
  "Conseil personnalisé",
  "Mesure précise",
  "Ajustement en magasin",
];

export default function Hero() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-[#f6f1e7] pt-20 text-[#102f36]"
      >
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1500px] lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="order-2 flex items-center px-6 py-14 sm:px-10 lg:order-1 lg:px-16 xl:px-20"
          >
            <div className="w-full max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#103943]/15 bg-white/60 px-4 py-2 backdrop-blur">
                <CheckCircle2 size={15} className="text-[#a27d38]" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a27d38]">
                  Opticien à Casablanca depuis 1998
                </p>
              </div>

              <h1
                id="hero-title"
                className="mt-7 text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-7xl xl:text-[5.8rem] [font-family:Georgia,serif]"
              >
                Votre regard,
                <span className="block font-normal text-[#a27d38]">
                  notre précision.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#526b6c] sm:text-lg">
                Des montures sélectionnées avec soin, un accompagnement humain
                et un ajustement précis pour une vision confortable au quotidien.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#collections"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#103943] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#103943]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#071d22]"
                >
                  Découvrir les collections
                  <ArrowDownRight size={17} />
                </Link>

                <button
                  type="button"
                  onClick={() => setAppointmentOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#a27d38]/60 bg-transparent px-7 py-4 text-sm font-semibold text-[#a27d38] transition duration-300 hover:-translate-y-1 hover:bg-white/70"
                >
                  <CalendarDays size={17} />
                  Prendre rendez-vous
                </button>
              </div>

              <Link
                href="/#application"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#103943] transition hover:text-[#a27d38]"
              >
                <Camera size={17} />
                Découvrir l’essayage en réalité augmentée
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
            className="order-1 relative min-h-[26rem] overflow-hidden bg-[#071d22] lg:order-2 lg:min-h-full"
          >
            <video
              src={withBasePath("/videos/persol-hachira.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Présentation premium de lunettes Loza Optique"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071d22]/60 via-transparent to-[#071d22]/10" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-[#071d22]/55 p-5 text-white backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm sm:p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d6bd82]">
                Expérience Loza Optique
              </p>

              <p className="mt-3 text-lg font-medium leading-7">
                Des montures choisies pour votre style, votre confort et votre
                regard.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-y border-[#103943]/10 bg-white/55 px-6 py-4 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 text-center sm:grid-cols-3 sm:gap-0">
            {trustItems.map((item, index) => (
              <div
                key={item}
                className={`flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium ${
                  index > 0 ? "sm:border-l sm:border-[#103943]/15" : ""
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#d6bd82]" />
                {item}
              </div>
            ))}
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
