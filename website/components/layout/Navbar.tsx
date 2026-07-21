"use client";

import {
  CalendarDays,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppointmentModal from "../appointment/AppointmentModal";
import { withBasePath } from "../../lib/site";

const navLinks = [
  { name: "Accueil", href: "/#top" },
  { name: "Collections", href: "/#collections" },
  { name: "Services", href: "/#services" },
  { name: "Application", href: "/#application" },
  { name: "À propos", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const contactLinks = [
  {
    name: "Téléphone",
    href: "tel:+212522821283",
    icon: Phone,
  },
  {
    name: "Google Maps",
    href: "https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca",
    icon: MapPin,
  },
  {
    name: "Email",
    href: "mailto:lozaoptique@gmail.com",
    icon: Mail,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeMenuOnResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);

    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#071d22]/95 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-white/10 bg-[#071d22]"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/#top"
            aria-label="Loza Optique — Accueil"
            onClick={closeMobileMenu}
            className="relative block h-16 w-[230px] shrink-0 sm:w-[250px]"
          >
            <Image
              src={withBasePath("/brand/logo-navbar-v3-tight.png")}
              alt="Loza Optique"
              fill
              priority
              sizes="250px"
              className="object-contain object-left scale-[1.06]"
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-7 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-3 text-sm font-medium text-white/75 transition hover:text-[#d6bd82]"
              >
                {link.name}

                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#d6bd82] transition-transform duration-300 hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="tel:+212522821283"
              className="hidden items-center gap-2 text-xs text-white/75 transition hover:text-[#d6bd82] 2xl:flex"
            >
              <Phone size={15} />
              +212 522 82 12 83
            </Link>

            <span className="hidden h-5 w-px bg-white/15 2xl:block" />

            <Link
              href="https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-xs text-white/75 transition hover:text-[#d6bd82] 2xl:flex"
            >
              <MapPin size={15} />
              Casablanca
            </Link>

            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="ml-2 inline-flex items-center justify-center gap-2 rounded-md border border-[#d6bd82]/70 px-5 py-3 text-xs font-semibold text-[#d6bd82] transition duration-300 hover:bg-[#d6bd82] hover:text-[#071d22]"
            >
              <CalendarDays size={15} />
              Prendre rendez-vous
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#d6bd82] hover:text-[#d6bd82] xl:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#071d22] px-5 pb-6 pt-4 xl:hidden"
          >
            <nav
              aria-label="Navigation mobile"
              className="mx-auto flex max-w-2xl flex-col"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="border-b border-white/10 py-4 text-sm font-medium text-white/80 transition hover:text-[#d6bd82]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-3 gap-3">
              {contactLinks.map((contact) => {
                const Icon = contact.icon;
                const external = contact.name === "Google Maps";

                return (
                  <Link
                    key={contact.name}
                    href={contact.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={contact.name}
                    title={contact.name}
                    onClick={closeMobileMenu}
                    className="flex aspect-square items-center justify-center rounded-2xl border border-white/15 text-white/80 transition hover:border-[#d6bd82] hover:bg-[#d6bd82] hover:text-[#071d22]"
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setAppointmentOpen(true);
              }}
              className="mx-auto mt-4 flex w-full max-w-2xl items-center justify-center gap-2 rounded-xl bg-[#d6bd82] px-5 py-4 text-sm font-semibold text-[#071d22]"
            >
              <CalendarDays size={18} />
              Prendre rendez-vous
            </button>
          </div>
        )}
      </header>

      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </>
  );
}

