import Link from "next/link";
import type { FooterConfig } from "@/types/site-config";

export default function Footer({ siteName, config }: { siteName: string; config: FooterConfig }) {
  return (
    <footer id="contact" className="bg-[#f58220] px-6 pb-8 pt-20 text-[#211a17] sm:pt-24">
      <div className="mx-auto max-w-8xl">
        <div className="grid gap-14 border-b border-[#211a17]/25 pb-16 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <p className="font-display text-5xl uppercase leading-none tracking-[0.04em] sm:text-7xl">{siteName}</p>
            <p className="mt-6 max-w-md text-lg leading-8 text-[#211a17]/70">{config.tagline}</p>
          </div>

          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em]">Explore</p>
            <div className="flex flex-col items-start gap-3">
              {config.links.map((link) => <Link key={link.label} href={link.href} className="text-lg font-bold transition hover:translate-x-1 hover:text-white">{link.label}</Link>)}
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em]">Say hello</p>
            <a href={`mailto:${config.email}`} className="text-lg font-bold hover:text-white">{config.email}</a>
            <div className="mt-8 flex flex-wrap gap-2">
              {config.socials.map((social) => <Link key={social.label} href={social.href} className="rounded-full border border-[#211a17]/30 px-4 py-2 text-sm font-bold uppercase transition hover:border-white hover:bg-white">{social.label}</Link>)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-sm font-semibold text-[#211a17]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteName}. {config.copyright}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#211a17]">Privacy</Link>
            <Link href="#" className="hover:text-[#211a17]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
