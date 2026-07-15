"use client";

import {
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/#" },
  { name: "Collections", href: "/#collections" },
  { name: "Services", href: "/#services" },
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
    href: "mailto:lozaoptiqque@gmail.com",
    icon: Mail,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }).format(new Date());

      setCurrentDate(formattedDate);
    };

    updateDate();

    const interval = window.setInterval(updateDate, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#071d22]/90 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          aria-label="LOZA Optique — Accueil"
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d6bd82]/60 bg-[#103943]">
            <span className="text-sm font-bold tracking-[-0.08em] text-[#d6bd82]">
              LO
            </span>

            <span className="absolute inset-[4px] rounded-full border border-white/10 transition duration-300 group-hover:rotate-45" />
          </span>

          <span>
            <span className="block text-xl font-semibold leading-none tracking-[0.08em]">
              LOZA
            </span>

            <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-[#d6bd82]">
              Optique
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2 text-sm font-medium text-white/70 transition hover:text-[#d6bd82]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-full border border-[#d6bd82]/35 bg-white/5 px-5 py-3 text-sm font-semibold capitalize text-[#d6bd82]">
            {currentDate || "Aujourd’hui"}
          </div>

          {contactLinks.map((contact) => {
            const Icon = contact.icon;

            return (
              <Link
                key={contact.name}
                href={contact.href}
                target={
                  contact.name === "Google Maps" ? "_blank" : undefined
                }
                rel={
                  contact.name === "Google Maps"
                    ? "noreferrer"
                    : undefined
                }
                aria-label={contact.name}
                title={contact.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition duration-300 hover:-translate-y-1 hover:border-[#d6bd82] hover:bg-[#d6bd82] hover:text-[#071d22]"
              >
                <Icon size={17} />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#071d22] px-5 pb-6 pt-4 md:hidden">
          <div className="mb-3 rounded-2xl border border-[#d6bd82]/25 bg-white/5 px-4 py-3 text-center text-sm font-semibold capitalize text-[#d6bd82]">
            {currentDate || "Aujourd’hui"}
          </div>

          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-medium text-white/80 transition hover:text-[#d6bd82]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {contactLinks.map((contact) => {
              const Icon = contact.icon;

              return (
                <Link
                  key={contact.name}
                  href={contact.href}
                  target={
                    contact.name === "Google Maps"
                      ? "_blank"
                      : undefined
                  }
                  rel="noreferrer"
                  aria-label={contact.name}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-white/15 text-white/80 transition hover:bg-[#d6bd82] hover:text-[#071d22]"
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}