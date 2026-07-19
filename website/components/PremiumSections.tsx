"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
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
      className="bg-[#f6f1e7] px-6 py-24 text-[#102f36]"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
          Notre savoir-faire
        </p>

        <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
          Des services pensés pour
          <span className="block italic text-[#a27d38]">
            chaque regard.
          </span>
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-[#103943]/10 bg-white p-7 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d6bd82]/20 text-[#a27d38]">
                  <Icon size={22} />
                </span>

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>

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
      className="overflow-hidden bg-[#071d22] px-6 py-24 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6bd82]/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#d6bd82]">
            <Camera size={15} />
            Expérience mobile
          </div>

          <h2 className="mt-7 text-4xl font-normal tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
            Essayez vos montures
            <span className="block italic text-[#d6bd82]">
              en réalité augmentée.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            La fonction AR est disponible exclusivement dans l’application
            mobile Loza Optique. Utilisez la caméra de votre téléphone pour
            visualiser certaines montures directement sur votre visage.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-[#d6bd82]">Android</p>
              <p className="mt-2 text-sm text-white/65">
                Publication Google Play en préparation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-[#d6bd82]">iPhone</p>
              <p className="mt-2 text-sm text-white/65">
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
        </div>

        <div className="mx-auto w-full max-w-sm rounded-[3rem] border border-white/15 bg-[#103943] p-4 shadow-2xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#f6f1e7] text-[#102f36]">
            <div className="flex items-center justify-between bg-[#071d22] px-6 py-5 text-[#d6bd82]">
              <span className="text-sm tracking-[0.18em]">
                LOZA OPTIQUE
              </span>
              <Smartphone size={19} />
            </div>

            <div className="relative flex aspect-[4/5] flex-col items-center justify-center bg-gradient-to-b from-[#e7d7bc] to-[#c9d3d0] p-7">
              <Camera size={50} className="text-[#a27d38]" />

              <h3 className="mt-6 text-center text-2xl font-semibold">
                Essayage virtuel AR
              </h3>

              <p className="mt-4 text-center text-sm leading-6 text-[#526b6c]">
                Sélectionnez une monture compatible et visualisez-la avec la
                caméra de votre téléphone.
              </p>

              <span className="mt-8 rounded-full bg-[#103943] px-6 py-3 text-sm font-semibold text-white">
                Disponible dans l’application
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#ede6d9] px-6 py-24 text-[#102f36]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="rounded-[2.5rem] bg-[#103943] p-10 text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d6bd82]">
            Notre histoire
          </p>

          <p className="mt-5 text-7xl text-[#d6bd82] [font-family:Georgia,serif]">
            1998
          </p>

          <p className="mt-4 text-lg leading-8 text-white/70">
            Une expérience construite autour du conseil, de la précision et de
            la confiance.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
            Notre expertise, votre confiance
          </p>

          <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
            Une maison d’optique proche de ses clients.
          </h2>

          <p className="mt-6 text-base leading-8 text-[#526b6c] sm:text-lg">
            Loza Optique accompagne chaque client dans le choix de montures
            adaptées à son style, à son confort et à ses besoins. Notre réseau
            de fournisseurs nous permet de proposer une sélection multimarque
            selon les arrivages et les disponibilités en boutique.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={PackageCheck}
              title="Sélection multimarque"
              text="Des collections choisies selon les arrivages."
            />
            <InfoCard
              icon={ShieldCheck}
              title="Conseil de confiance"
              text="Un accompagnement humain et personnalisé."
            />
            <InfoCard
              icon={Glasses}
              title="Précision en boutique"
              text="Mesure, montage et ajustement attentifs."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Glasses;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#103943]/10 bg-white/70 p-5">
      <Icon size={21} className="text-[#a27d38]" />
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#526b6c]">{text}</p>
    </div>
  );
}

export function ContactSection() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="bg-[#f6f1e7] px-6 py-24 text-[#102f36]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
              Nous trouver
            </p>

            <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] sm:text-6xl [font-family:Georgia,serif]">
              Passez nous voir à Casablanca.
            </h2>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link
                href="tel:+212522821283"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6"
              >
                <Phone className="text-[#a27d38]" size={21} />
                <p className="mt-4 text-sm text-[#526b6c]">Téléphone</p>
                <p className="mt-1 font-semibold">+212 522 82 12 83</p>
              </Link>

              <Link
                href="mailto:lozaoptique@gmail.com"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6"
              >
                <Mail className="text-[#a27d38]" size={21} />
                <p className="mt-4 text-sm text-[#526b6c]">Email</p>
                <p className="mt-1 break-all font-semibold">
                  lozaoptique@gmail.com
                </p>
              </Link>

              <Link
                href="https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#103943]/10 bg-white p-6 sm:col-span-2"
              >
                <MapPin className="text-[#a27d38]" size={21} />
                <p className="mt-4 text-sm text-[#526b6c]">Adresse</p>
                <p className="mt-1 font-semibold">
                  132 Souk Korea, Bloc EF, Casablanca
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#a27d38]">
                  Ouvrir Google Maps
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>

            <div className="mt-5 rounded-2xl bg-[#ede6d9] p-6">
              <div className="flex gap-4">
                <Clock
                  size={21}
                  className="mt-1 shrink-0 text-[#a27d38]"
                />
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p className="mt-2 text-sm leading-6 text-[#526b6c]">
                    Vendredi : fermé. Contactez la boutique pour confirmer les
                    horaires des autres jours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="rendez-vous"
            className="rounded-[2.5rem] bg-[#103943] p-9 text-white"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6bd82]">
              Rendez-vous
            </p>

            <h2 className="mt-5 text-4xl font-normal [font-family:Georgia,serif]">
              Un créneau dédié, une confirmation humaine.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              Préparez votre demande en ligne. Loza Optique vous contactera
              ensuite pour confirmer le rendez-vous.
            </p>

            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="mt-8 w-full rounded-full bg-[#d6bd82] px-7 py-4 text-sm font-semibold text-[#071d22]"
            >
              Préparer ma demande
            </button>
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
    <footer className="bg-[#071d22] px-6 pb-28 pt-10 text-white md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xl tracking-[0.12em] text-[#d6bd82]">
            LOZA OPTIQUE
          </p>
          <p className="mt-2 text-sm text-white/55">
            Opticien à Casablanca depuis 1998.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5 text-sm text-white/70">
          <Link href="/#top">Accueil</Link>
          <Link href="/#collections">Collections</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#application">Application</Link>
          <Link href="/confidentialite/">Confidentialité</Link>
        </nav>

        <p className="text-xs text-white/45">
          © 2026 Loza Optique.
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