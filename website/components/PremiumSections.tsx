"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  Glasses,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";

const services = [
  {
    title: "Examen visuel",
    description:
      "Bilan visuel précis et accompagnement personnalisé en boutique.",
    icon: Eye,
  },
  {
    title: "Montage & ajustement",
    description:
      "Montage soigné et réglage adapté à votre confort quotidien.",
    icon: Glasses,
  },
  {
    title: "Conseil morphologique",
    description:
      "Une sélection pensée selon votre visage, votre style et vos besoins.",
    icon: ScanFace,
  },
  {
    title: "Entretien & réparation",
    description:
      "Nettoyage, réglages et petites réparations pour prolonger la vie de vos lunettes.",
    icon: Wrench,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#f6f1e7] px-6 py-24 text-[#102f36] sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
            Notre savoir-faire
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
            Des services pensés pour
            <span className="block font-normal italic text-[#a27d38]">
              chaque regard.
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-[#103943]/10 bg-white p-7 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d6bd82]/20 text-[#a27d38]">
                  <Icon size={22} />
                </span>

                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>

                <p className="mt-3 text-sm leading-7 text-[#526b6c]">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AppExperienceSection() {
  return (
    <section
      id="application"
      className="overflow-hidden bg-[#071d22] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6bd82]/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#d6bd82]">
            <Camera size={15} />
            Expérience mobile
          </div>

          <h2 className="mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
            Essayez vos montures
            <span className="block font-normal italic text-[#d6bd82]">
              en réalité augmentée.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            La fonction AR est disponible exclusivement dans l’application
            mobile Loza Optique. Utilisez la caméra de votre téléphone pour
            visualiser certaines montures sur votre visage.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-[#d6bd82]">Android</p>
              <p className="mt-2 text-sm text-white/70">
                Publication Google Play en préparation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-[#d6bd82]">iPhone</p>
              <p className="mt-2 text-sm text-white/70">
                Version App Store en préparation.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#d6bd82] px-6 py-3 text-sm font-semibold text-[#071d22]">
              Bientôt sur Google Play
            </span>

            <span className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80">
              Version iPhone prochainement
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-[3.25rem] border border-white/15 bg-[#103943] p-4 shadow-2xl shadow-black/30">
            <div className="overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#f6f1e7] text-[#102f36]">
              <div className="flex items-center justify-between bg-[#071d22] px-6 py-5 text-[#d6bd82]">
                <span className="text-sm tracking-[0.18em]">
                  LOZA OPTIQUE
                </span>
                <Smartphone size={19} />
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#d9c7a4] via-[#f3eadc] to-[#c6d1cf] p-7">
                <div className="absolute inset-x-7 top-7 rounded-3xl border border-[#103943]/10 bg-white/70 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#103943] text-white">
                      <Camera size={20} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold">Essayage AR</p>
                      <p className="text-xs text-[#526b6c]">
                        Caméra traitée localement
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 rounded-[3rem] border-4 border-[#a27d38] px-8 py-10">
                  <div className="mx-auto flex max-w-[14rem] items-center justify-center gap-4">
                    <span className="h-20 flex-1 rounded-[2rem] border-[5px] border-[#071d22] bg-white/10" />
                    <span className="h-1.5 w-8 bg-[#071d22]" />
                    <span className="h-20 flex-1 rounded-[2rem] border-[5px] border-[#071d22] bg-white/10" />
                  </div>
                </div>

                <div className="absolute inset-x-7 bottom-7 rounded-3xl bg-[#071d22] p-5 text-white">
                  <p className="text-sm font-semibold">
                    Voyez avant de choisir
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/65">
                    Une sélection de montures compatibles avec l’essayage
                    virtuel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const pillars = [
    {
      title: "Sélection multimarque",
      text: "Des collections choisies selon les arrivages et les besoins de la clientèle.",
      icon: PackageCheck,
    },
    {
      title: "Conseil de confiance",
      text: "Un accompagnement humain avant, pendant et après le choix de la monture.",
      icon: ShieldCheck,
    },
    {
      title: "Précision en boutique",
      text: "Mesure, montage et ajustement réalisés avec attention.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#ede6d9] px-6 py-24 text-[#102f36] sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-[2.5rem] bg-[#103943] p-9 text-white sm:p-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#d6bd82]">
            Notre histoire
          </p>

          <p className="mt-6 text-7xl font-semibold text-[#d6bd82] [font-family:Georgia,serif]">
            1998
          </p>

          <p className="mt-4 text-lg leading-8 text-white/75">
            Une expérience construite autour du conseil, de la précision et de
            la confiance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
            Notre expertise, votre confiance
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
            Une maison d’optique proche de ses clients.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#526b6c] sm:text-lg">
            Loza Optique accompagne chaque client dans le choix de montures
            adaptées à son style, à son confort et à ses besoins. Notre réseau
            de fournisseurs nous permet de proposer une sélection multimarque
            selon les disponibilités en boutique.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[#103943]/10 bg-white/70 p-5"
                >
                  <Icon size={21} className="text-[#a27d38]" />

                  <h3 className="mt-4 font-semibold">{pillar.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-[#526b6c]">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="bg-[#f6f1e7] px-6 py-24 text-[#102f36] sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
              Nous trouver
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
              Passez nous voir à Casablanca.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link
                href="tel:+212522821283"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Phone size={21} className="text-[#a27d38]" />
                <p className="mt-4 text-sm text-[#526b6c]">Téléphone</p>
                <p className="mt-1 font-semibold">+212 522 82 12 83</p>
              </Link>

              <Link
                href="mailto:lozaoptique@gmail.com"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Mail size={21} className="text-[#a27d38]" />
                <p className="mt-4 text-sm text-[#526b6c]">Email</p>
                <p className="mt-1 break-all font-semibold">
                  lozaoptique@gmail.com
                </p>
              </Link>

              <Link
                href="https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg sm:col-span-2"
              >
                <MapPin size={21} className="text-[#a27d38]" />
                <p className="mt-4 text-sm text-[#526b6c]">Adresse</p>
                <p className="mt-1 font-semibold">
                  132 Souk Korea, Bloc EF, Casablanca
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#a27d38]">
                  Ouvrir dans Google Maps
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border border-[#103943]/10 bg-[#ede6d9] p-6">
              <div className="flex items-start gap-4">
                <Clock
                  size={21}
                  className="mt-1 shrink-0 text-[#a27d38]"
                />

                <div>
                  <p className="font-semibold">Horaires</p>
                  <p className="mt-2 text-sm leading-6 text-[#526b6c]">
                    Vendredi : fermé. Pour les autres jours, contactez la
                    boutique pour confirmer l’horaire du jour.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="rendez-vous"
            className="rounded-[2.5rem] bg-[#103943] p-8 text-white sm:p-10"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6bd82]">
              Prendre rendez-vous
            </p>

            <h2 className="mt-5 text-4xl font-semibold [font-family:Georgia,serif]">
              Un créneau dédié, une confirmation humaine.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              Préparez votre demande en ligne. Loza Optique vous contactera
              ensuite pour confirmer le jour et le créneau.
            </p>

            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="mt-8 w-full rounded-full bg-[#d6bd82] px-7 py-4 text-sm font-semibold text-[#071d22] transition hover:-translate-y-1 hover:bg-white"
            >
              Préparer ma demande
            </button>

            <div className="mt-8 border-t border-white/15 pt-6 text-sm text-white/70">
              <p className="flex items-center gap-3">
                <Phone size={17} />
                +212 522 82 12 83
              </p>

              <p className="mt-3 flex items-center gap-3">
                <Mail size={17} />
                lozaoptique@gmail.com
              </p>
            </div>
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

export function HomeFooter() {
  return (
    <footer className="bg-[#071d22] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xl tracking-[0.12em] text-[#d6bd82]">
            LOZA OPTIQUE
          </p>

          <p className="mt-2 text-sm text-white/55">
            Opticien à Casablanca depuis 1998.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
          <Link href="/#top" className="hover:text-[#d6bd82]">
            Accueil
          </Link>

          <Link href="/#collections" className="hover:text-[#d6bd82]">
            Collections
          </Link>

          <Link href="/#services" className="hover:text-[#d6bd82]">
            Services
          </Link>

          <Link href="/#application" className="hover:text-[#d6bd82]">
            Application
          </Link>

          <Link href="/confidentialite/" className="hover:text-[#d6bd82]">
            Confidentialité
          </Link>
        </nav>

        <p className="text-xs text-white/45">
          © 2026 Loza Optique. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#071d22]/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Link
          href="tel:+212522821283"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
        >
          <Phone size={17} />
          Appeler
        </Link>

        <Link
          href="/#rendez-vous"
          className="flex items-center justify-center rounded-xl bg-[#d6bd82] px-4 py-3 text-sm font-semibold text-[#071d22]"
        >
          Rendez-vous
        </Link>
      </div>
    </div>
  );
}