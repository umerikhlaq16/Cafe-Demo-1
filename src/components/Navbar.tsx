"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { NavbarConfig } from "@/types/site-config";

type NavbarProps = {
  siteName: string;
  homeUrl: string;
  config: NavbarConfig;
};

export default function Navbar({ siteName, homeUrl, config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { ariaLabel, links, cta } = config;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/50 bg-white/90 px-4 shadow-[0_12px_40px_rgba(42,27,18,0.12)] backdrop-blur-xl sm:px-6"
        aria-label={ariaLabel}
      >
        <Link href={homeUrl} className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-[#f58220] text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
              <path d="M5 8h11v5.5A5.5 5.5 0 0 1 10.5 19 5.5 5.5 0 0 1 5 13.5V8Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 5c0-1 1-1.5 1-2.5M12 5c0-1 1-1.5 1-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg uppercase tracking-wide text-[#211a17]">{siteName}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-[#f4efe8] p-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-white hover:text-[#211a17]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={cta.href}
          className="hidden rounded-full bg-[#211a17] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#f58220] md:inline-flex"
        >
          {cta.label}
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-full text-[#352119] transition-colors hover:bg-stone-200/60 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span className="relative block h-5 w-6">
            <span className={`absolute left-0 top-1 h-0.5 w-6 bg-current transition-transform ${isOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-2.5 h-0.5 w-6 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {links.map((link, index) => (
                <motion.div key={link.label} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-stone-700 hover:bg-[#f3e8da] hover:text-[#5b3424]">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href={cta.href} onClick={() => setIsOpen(false)} className="mt-3 rounded-full bg-[#5b3424] px-5 py-3 text-center text-sm font-semibold text-white">
                {cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
