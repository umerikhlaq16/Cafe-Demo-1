"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { AppDownloadConfig } from "@/types/site-config";

function StoreIcon({ store }: { store: string }) {
  if (store.toLowerCase().includes("app")) {
    return (
      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.1v-.01ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
      <path fill="#34A853" d="M3.6 2.4 14.9 12 3.6 21.6c-.4-.4-.6-1-.6-1.7V4.1c0-.7.2-1.3.6-1.7Z" />
      <path fill="#4285F4" d="m14.9 12 3.3-2.8L6.5 2.6C5.7 2.1 4.6 1.9 3.8 2.3L14.9 12Z" />
      <path fill="#FBBC04" d="m14.9 12-11.1 9.7c.8.4 1.9.2 2.7-.3l11.8-6.7-3.4-2.7Z" />
      <path fill="#EA4335" d="M21 10.8 18.2 9l-3.3 3 3.4 2.7 2.7-1.5c1-.6 1-1.8 0-2.4Z" />
    </svg>
  );
}

export default function AppDownloadSection({ config }: { config: AppDownloadConfig }) {
  return (
    <section className="overflow-hidden bg-[#f4efe8] px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-8xl overflow-hidden rounded-[2.75rem] bg-[#151515] lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-center p-8 text-white sm:p-14 lg:p-16 xl:p-20"
        >
          <p className="mb-6 text-xs font-black uppercase tracking-[0.32em] text-[#f58220]">{config.eyebrow}</p>
          <h2 className="font-display max-w-2xl whitespace-pre-line text-5xl uppercase leading-[1.05] tracking-[0.035em] sm:text-6xl xl:text-7xl">
            {config.title}
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-white/60">{config.description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {config.stores.map((store) => (
              <Link key={store.name} href={store.href} className="group flex min-w-52 items-center gap-4 rounded-xl bg-white px-5 py-3 text-[#151515] transition hover:-translate-y-1 hover:bg-[#f58220] hover:text-white">
                <StoreIcon store={store.name} />
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-55">Download on the</span>
                  <span className="block text-base font-black">{store.name}</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/50">
            {config.features.map((feature) => <span key={feature} className="before:mr-2 before:text-[#f58220] before:content-['✓']">{feature}</span>)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative min-h-[580px] overflow-hidden bg-[#f58220] sm:min-h-[720px]"
        >
          <div className="absolute inset-0">
            <Image src={config.image} alt={config.imageAlt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
