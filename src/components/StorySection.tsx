"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { StorySectionConfig } from "@/types/site-config";

export default function StorySection({ config }: { config: StorySectionConfig }) {
  return (
    <section className="overflow-hidden bg-[#f4efe8] px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-8xl items-stretch lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative min-h-[430px] overflow-hidden rounded-t-[2.5rem] lg:min-h-[650px] lg:rounded-l-[3rem] lg:rounded-tr-none"
        >
          <Image src={config.image} alt={config.imageAlt} fill sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.03]" />
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#211a17] backdrop-blur sm:left-8 sm:top-8">
            {config.badge}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="relative flex flex-col justify-between overflow-hidden rounded-b-[2.5rem] bg-[#151515] p-8 sm:p-12 lg:rounded-r-[3rem] lg:rounded-bl-none lg:p-14"
        >
          <span className="font-display text-[8rem] leading-none text-white/10 sm:text-[11rem]">+</span>
          <div className="relative mt-10 lg:mt-0">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#f58220]">{config.eyebrow}</p>
            <h2 className="font-display whitespace-pre-line text-4xl uppercase leading-[1.08] tracking-[0.035em] text-white sm:text-5xl">
              {config.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/60 sm:text-lg">{config.description}</p>
            <Link href={config.cta.href} className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#f58220] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#211a17]">
              {config.cta.label}<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
