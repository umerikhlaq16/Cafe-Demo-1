"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductItem, ProductsSectionConfig } from "@/types/site-config";

const accents = ["#ffdfb8", "#ffd0d5", "#ffe49f", "#dceec5", "#ffd1c3", "#d9d5ff", "#ffe0cb", "#fff0a8"];
const addOns = [
  { name: "Extra fruit", price: 0.9 },
  { name: "Chia seeds", price: 0.6 },
  { name: "Granola crunch", price: 0.75 },
  { name: "Protein boost", price: 1.2 },
];

export default function ProductsSection({ config, sectionId = "menu" }: { config: ProductsSectionConfig; sectionId?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [size, setSize] = useState<"regular" | "large">("regular");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const openOrder = (product: ProductItem) => {
    setSelected(product);
    setSize("regular");
    setQuantity(1);
    setSelectedAddOns([]);
    setAddress("");
    setInstructions("");
    setOrdered(false);
  };

  const closeOrder = () => setSelected(null);
  const basePrice = selected ? Number(selected.price.replace(/[^0-9.]/g, "")) : 0;
  const extrasTotal = addOns.filter((item) => selectedAddOns.includes(item.name)).reduce((sum, item) => sum + item.price, 0);
  const total = ((basePrice + (size === "large" ? 1.25 : 0) + extrasTotal) * quantity).toFixed(2);

  return (
    <section id={sectionId} className="overflow-hidden bg-[#f4efe8] py-24 sm:py-32 [&_button]:cursor-pointer">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-[#211a17]/15 pb-8">
          <div>
            <p className="sr-only">{config.eyebrow}</p>
            <h2 className="font-display text-4xl uppercase leading-tight tracking-[0.035em] text-[#211a17] sm:text-6xl">{config.title}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scrollerRef.current?.scrollBy({ left: -380, behavior: "smooth" })} aria-label="Previous products" className="grid size-12 place-items-center rounded-full border border-stone-300 text-2xl transition hover:border-[#f27d18] hover:bg-[#f27d18] hover:text-white">←</button>
            <button onClick={() => scrollerRef.current?.scrollBy({ left: 380, behavior: "smooth" })} aria-label="Next products" className="grid size-12 place-items-center rounded-full border border-stone-300 text-2xl transition hover:border-[#f27d18] hover:bg-[#f27d18] hover:text-white">→</button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-8xl px-6 sm:px-8 lg:px-10">
        <div ref={scrollerRef} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5">
          {config.items.map((product, index) => (
            <motion.button
              type="button"
              key={product.name}
              onClick={() => openOrder(product)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="w-[82vw] max-w-[350px] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-black/5 text-left shadow-sm transition-shadow hover:shadow-xl sm:w-[calc((100%_-_3.75rem)/4)] sm:min-w-[290px]"
              style={{ backgroundColor: accents[index % accents.length] }}
            >
              <div className="group relative aspect-square overflow-hidden">
                <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 82vw, 350px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-[#151515] text-2xl text-white shadow-lg transition-transform group-hover:rotate-90">+</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-base uppercase leading-tight tracking-[0.02em] text-[#211a17]">{product.name}</h3>
                  <p className="rounded-full bg-white/70 px-3 py-1 text-sm font-black text-[#211a17]">{product.price}</p>
                </div>
                <p className="mt-4 text-sm leading-5 text-[#211a17]/65">{product.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100]">
            <motion.button type="button" aria-label="Close order panel" onClick={closeOrder} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col overflow-y-auto bg-[#fffaf3] shadow-2xl"
              aria-label={`Order ${selected.name}`}
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                <Image src={selected.image} alt={selected.imageAlt} fill sizes="(max-width: 512px) 100vw, 512px" className="object-cover" />
                <button onClick={closeOrder} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white text-xl font-bold shadow-lg" aria-label="Close">×</button>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                {!ordered ? (
                  <>
                    <div className="flex items-start justify-between gap-5">
                      <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f58220]">Build your order</p><h2 className="font-display mt-2 text-3xl uppercase leading-tight">{selected.name}</h2></div>
                      <span className="rounded-full bg-[#f58220] px-4 py-2 text-sm font-black text-white">{selected.price}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-stone-600">{selected.description}</p>

                    <fieldset className="mt-7"><legend className="text-sm font-black uppercase tracking-wider">Choose size</legend><div className="mt-3 grid grid-cols-2 gap-3">
                      {(["regular", "large"] as const).map((option) => <button type="button" key={option} onClick={() => setSize(option)} className={`rounded-2xl border px-4 py-4 text-left text-sm font-bold capitalize transition ${size === option ? "border-[#f58220] bg-[#f58220] text-white" : "border-stone-200 bg-white"}`}>{option}<span className="block text-xs opacity-65">{option === "large" ? "+$1.25" : "Standard"}</span></button>)}
                    </div></fieldset>

                    <fieldset className="mt-7"><legend className="text-sm font-black uppercase tracking-wider">Add something extra</legend><div className="mt-3 grid grid-cols-2 gap-3">
                      {addOns.map((item) => { const active = selectedAddOns.includes(item.name); return <button type="button" key={item.name} onClick={() => setSelectedAddOns(active ? selectedAddOns.filter((name) => name !== item.name) : [...selectedAddOns, item.name])} className={`rounded-2xl border p-4 text-left transition ${active ? "border-[#f58220] bg-[#fff0df]" : "border-stone-200 bg-white"}`}><span className="flex items-center justify-between gap-2 text-sm font-bold"><span>{item.name}</span><span className={active ? "text-[#f58220]" : "text-stone-400"}>{active ? "✓" : "+"}</span></span><span className="mt-1 block text-xs text-stone-500">+${item.price.toFixed(2)}</span></button>; })}
                    </div></fieldset>

                    <div className="mt-7">
                      <label htmlFor={`${sectionId}-address`} className="text-sm font-black uppercase tracking-wider">Delivery address</label>
                      <div className="mt-3 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 transition focus-within:border-[#f58220] focus-within:ring-4 focus-within:ring-[#f58220]/10">
                        <span aria-hidden="true" className="mt-0.5 text-lg">⌖</span>
                        <input
                          id={`${sectionId}-address`}
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          placeholder="House, street, area and city"
                          autoComplete="street-address"
                          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor={`${sectionId}-instructions`} className="text-sm font-black uppercase tracking-wider">Delivery instructions <span className="font-medium normal-case text-stone-400">(optional)</span></label>
                      <div className="mt-3 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 transition focus-within:border-[#f58220] focus-within:ring-4 focus-within:ring-[#f58220]/10">
                        <span aria-hidden="true" className="mt-0.5 text-base">✎</span>
                        <textarea
                          id={`${sectionId}-instructions`}
                          value={instructions}
                          onChange={(event) => setInstructions(event.target.value)}
                          placeholder="Gate number, landmark, or rider note…"
                          rows={2}
                          className="min-w-0 flex-1 resize-none bg-transparent text-sm font-medium outline-none placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
                      <span className="pl-2 text-sm font-black uppercase">Quantity</span>
                      <div className="flex items-center gap-5"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid size-10 place-items-center rounded-full bg-[#f4efe8] text-xl">−</button><span className="font-black">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="grid size-10 place-items-center rounded-full bg-[#151515] text-xl text-white">+</button></div>
                    </div>

                    <button disabled={!address.trim()} onClick={() => setOrdered(true)} className="mt-6 flex w-full items-center justify-between rounded-full bg-[#151515] px-6 py-4 font-black uppercase tracking-wide text-white transition hover:bg-[#f58220] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"><span>{address.trim() ? "Place order" : "Add delivery address"}</span><span>${total}</span></button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="my-auto py-12 text-center">
                    <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#f58220] text-4xl text-white">✓</span>
                    <h2 className="font-display mt-7 text-4xl uppercase">Order added!</h2>
                    <p className="mx-auto mt-4 max-w-sm text-stone-600">Your {selected.name} order has been prepared in this demo cart.</p>
                    <button onClick={closeOrder} className="mt-8 rounded-full bg-[#151515] px-7 py-4 text-sm font-black uppercase text-white">Continue browsing</button>
                  </motion.div>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
