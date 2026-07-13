"use client";

import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Collections", href: "#" },
  { name: "Services", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0b1722]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          LOZA
          <span className="ml-1 text-[#caa86b]">Optique</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition hover:text-[#caa86b]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <button className="hidden rounded-full bg-[#caa86b] px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 md:block">
          Book Appointment
        </button>

        {/* Mobile */}
        <button className="text-3xl text-white md:hidden">
          ☰
        </button>

      </div>
    </header>
  );
}