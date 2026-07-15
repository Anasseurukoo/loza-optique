"use client";

import {
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/#" },
  { name: "Collections", href: "/#collections" },
  { name: "Services", href: "/#services" },
  { name: "À propos", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const contactLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/212600000000",
    icon: MessageCircle,
  },
  {
    name: "Téléphone",
    href: "tel:+212600000000",
    icon: Phone,
  },
  {
    name: "Google Maps",
    href: "https://maps.google.com",
    icon: MapPin,
  },
  {
    name: "Email",
    href: "mailto:contact@lozaoptique.ma",
    icon: Mail,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#071d22]/90 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Brand identity */}
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

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative py-2 text-sm font-medium text-white/70 transition hover:text-[#d6bd82]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop contact icons */}
        <div className="hidden items-center gap-2 md:flex">
          {contactLinks.map((contact) => {
            const Icon = contact.icon;

            return (
              <Link
                key={contact.name}
                href={contact.href}
                target={
                  contact.name === "WhatsApp" ||
                  contact.name === "Google Maps"
                    ? "_blank"
                    : undefined
                }
                rel={
                  contact.name === "WhatsApp" ||
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

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#071d22] px-5 pb-6 pt-4 md:hidden">
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

          <div className="mt-5 grid grid-cols-4 gap-3">
            {contactLinks.map((contact) => {
              const Icon = contact.icon;

              return (
                <Link
                  key={contact.name}
                  href={contact.href}
                  target={
                    contact.name === "WhatsApp" ||
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