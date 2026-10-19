"use client";

import { motion } from "framer-motion";
import type { WhySectionConfig } from "@/types/site-config";

export default function WhySection({ config }: { config: WhySectionConfig }) {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-[#f58220] px-6 py-24 text-[#211a17] sm:py-32">
      <div className="pointer-events-none absolute -right-10 top-2 -z-10 font-display text-[28vw] leading-none text-black/[0.045]">
        WHY
      </div>
      <div className="pointer-events-none absolute -bottom-28 -left-16 -z-10 size-80 rounded-full bg-[#ffd480]/35 blur-sm sm:size-[28rem]" />

      <div className="mx-auto max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl"
        >
          <p className="mb-5 text-xs font-black uppercase tracking-[0.32em]">{config.eyebrow}</p>
          <h2 className="font-display text-5xl uppercase leading-[1.02] tracking-[0.035em] sm:text-7xl lg:text-8xl">
            {config.title}
          </h2>
          <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-[#211a17]/70">{config.intro}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {config.items.map((item, index) => (
            <motion.article
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className={`relative max-w-xs ${index % 2 === 1 ? "lg:translate-y-12" : ""}`}
            >
              <span className="font-display block text-7xl leading-none text-[#fff2d8] sm:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-black uppercase leading-tight tracking-tight">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#211a17]/65">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(circle_at_12px_0,transparent_11px,#f4efe8_12px)] bg-[length:24px_14px]" />
    </section>
  );
}
