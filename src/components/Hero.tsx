"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { HeroConfig } from "@/types/site-config";

export default function Hero({ config }: { config: HeroConfig }) {
  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-sky-300 bg-cover bg-[position:58%_center] sm:bg-center"
      style={{ backgroundImage: `url(${config.backgroundImage})` }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b6fa4]/75 via-sky-700/15 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex min-h-screen max-w-8xl flex-col items-start justify-center px-6 pb-16 pt-28 text-left sm:px-8 lg:px-10"
      >
        <p className="mb-5 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm sm:text-sm">
          {config.eyebrow}
        </p>
        <h1 className="font-display max-w-3xl whitespace-pre-line text-5xl uppercase leading-[1.05] tracking-[0.045em] text-white drop-shadow-[0_3px_12px_rgba(29,78,120,0.22)] sm:text-7xl lg:text-8xl">
          {config.title}
        </h1>
        <p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/90 drop-shadow sm:text-lg">
          {config.description}
        </p>
        <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={config.cta.href}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f58220] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-[#211a17] after:content-['→']"
          >
            {config.cta.label}
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}
