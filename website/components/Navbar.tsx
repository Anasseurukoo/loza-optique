"use client";

import { Menu, Phone, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/#top" },
  { name: "Collections", href: "/#collections" },
  { name: "Services", href: "/#services" },
  { name: "Application", href: "/#application" },
  { name: "À propos", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071d22]/95 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/#top"
          aria-label="Loza Optique — Accueil"
          className="shrink-0"
        >
          <span className="block text-lg font-medium tracking-[0.15em] text-[#d6bd82] sm:text-xl">
            LOZA OPTIQUE
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative py-2 text-sm font-medium text-white/75 transition hover:text-[#d6bd82]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="tel:+212522821283"
            className="hidden items-center gap-2 text-sm text-white/75 transition hover:text-[#d6bd82] lg:flex"
          >
            <Phone size={16} />
            +212 522 82 12 83
          </Link>

          <Link
            href="https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#d6bd82] hover:text-[#d6bd82] lg:flex"
            aria-label="Ouvrir Google Maps"
          >
            <MapPin size={17} />
          </Link>

          <Link
            href="/#rendez-vous"
            className="rounded-md border border-[#d6bd82]/70 px-5 py-3 text-sm font-semibold text-[#d6bd82] transition hover:bg-[#d6bd82] hover:text-[#071d22]"
          >
            Prendre rendez-vous
          </Link>
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
        <div className="border-t border-white/10 bg-[#071d22] px-5 pb-6 pt-3 md:hidden">
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

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="tel:+212522821283"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white"
            >
              <Phone size={17} />
              Appeler
            </Link>

            <Link
              href="/#rendez-vous"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-xl bg-[#d6bd82] px-4 py-3 text-sm font-semibold text-[#071d22]"
            >
              Rendez-vous
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
