"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  defaultOpenId,
}: {
  items: FaqItem[];
  defaultOpenId?: string;
}) {
  const accordionId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${accordionId}-btn-${item.id}`;
        const panelId = `${accordionId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="border-b border-dashed border-od-dark-blue/15 last:border-b-0"
          >
            <button
              id={buttonId}
              type="button"
              className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-od-mid-blue/40 cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            >
              <span className="font-sans text-base md:text-lg font-semibold text-[color:var(--od-dark-blue)]">
                {item.question}
              </span>
              <span
                className={
                  "flex h-9 w-9 items-center justify-center rounded-full border border-od-dark-blue/10 bg-white/60 text-[color:var(--od-dark-blue)] transition-transform duration-300 " +
                  (isOpen ? "rotate-180" : "rotate-0")
                }
                aria-hidden="true"
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  key={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="font-lato text-sm md:text-base text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
