"use client";

import { motion } from "framer-motion";
import { Clock3, FileText } from "lucide-react";

type ProcessingOrder = {
  id: string;
  customer: string;
  items: number;
  service: "Express" | "Tracked 24" | "Tracked 48" | "Next Day" | "Standard";
  zone: "A" | "B" | "C";
  channel: "Web" | "Marketplace" | "Wholesale";
  received: string;
  cutoff: string;
};

const MOCK_ORDERS: readonly ProcessingOrder[] = [
  {
    id: "OD-10492",
    customer: "Harlow & Co",
    items: 2,
    service: "Express",
    zone: "B",
    channel: "Web",
    received: "09:12",
    cutoff: "11:30",
  },
  {
    id: "OD-10493",
    customer: "North Ridge",
    items: 5,
    service: "Tracked 48",
    zone: "A",
    channel: "Marketplace",
    received: "09:14",
    cutoff: "16:00",
  },
  {
    id: "OD-10494",
    customer: "Kite Studio",
    items: 1,
    service: "Tracked 24",
    zone: "C",
    channel: "Web",
    received: "09:16",
    cutoff: "14:30",
  },
  {
    id: "OD-10495",
    customer: "Vela Supply",
    items: 3,
    service: "Standard",
    zone: "B",
    channel: "Wholesale",
    received: "09:18",
    cutoff: "17:00",
  },
  {
    id: "OD-10496",
    customer: "Bayside Works",
    items: 4,
    service: "Next Day",
    zone: "A",
    channel: "Web",
    received: "09:20",
    cutoff: "13:00",
  },
  {
    id: "OD-10497",
    customer: "Sable & Stone",
    items: 2,
    service: "Tracked 48",
    zone: "C",
    channel: "Marketplace",
    received: "09:22",
    cutoff: "16:00",
  },
  {
    id: "OD-10498",
    customer: "Brightwell Trading",
    items: 6,
    service: "Tracked 24",
    zone: "B",
    channel: "Wholesale",
    received: "09:24",
    cutoff: "14:30",
  },
  {
    id: "OD-10499",
    customer: "Hearthline",
    items: 1,
    service: "Express",
    zone: "A",
    channel: "Web",
    received: "09:26",
    cutoff: "11:30",
  },
  {
    id: "OD-10500",
    customer: "Marrow Goods",
    items: 3,
    service: "Standard",
    zone: "C",
    channel: "Marketplace",
    received: "09:28",
    cutoff: "17:00",
  },
  {
    id: "OD-10501",
    customer: "Dock & Field",
    items: 2,
    service: "Next Day",
    zone: "B",
    channel: "Web",
    received: "09:30",
    cutoff: "13:00",
  },
  {
    id: "OD-10502",
    customer: "Wren Collective",
    items: 4,
    service: "Tracked 24",
    zone: "A",
    channel: "Marketplace",
    received: "09:33",
    cutoff: "14:30",
  },
  {
    id: "OD-10503",
    customer: "Norelia",
    items: 1,
    service: "Tracked 48",
    zone: "B",
    channel: "Web",
    received: "09:35",
    cutoff: "16:00",
  },
] as const;

export function ProcessingScene() {
  return (
    <div className="relative w-full h-full flex items-center justify-end -mr-14 -mb-14">
      <motion.div
        className="w-120 h-112 bg-white rounded-xs shadow-lg border border-slate-200 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Header */}
        <div className="h-10 border-b border-slate-100 bg-slate-50 flex items-center px-4 justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Pending Orders
          </span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>
        {/* List Rows */}
        <div className="p-2 space-y-1.5">
          {MOCK_ORDERS.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.08, 0.8) }}
              className="h-8 rounded md:h-10 bg-slate-50 border border-slate-100 flex items-center px-3 justify-between"
            >
              <div className="flex items-center gap-2">
                <FileText size={12} className="text-od-mid-blue" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-semibold text-slate-700 font-sans truncate">
                      {order.id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-lato truncate">
                      {order.customer}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-lato">
                    {order.items} {order.items === 1 ? "item" : "items"} • Zone {order.zone} • {order.channel} • Rec {order.received}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex text-[10px] font-semibold font-sans text-od-dark-blue bg-od-light-blue/20 border border-od-dark-blue/10 px-2 py-0.5 rounded-full">
                  {order.service}
                </span>
                <span className="hidden md:inline-flex text-[10px] text-slate-500 font-lato">
                  Cutoff {order.cutoff}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: Math.min(i * 0.08, 0.8) + 0.3 }}
                  className="flex items-center"
                  aria-label="Pending"
                >
                  <Clock3 size={12} className="text-slate-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
