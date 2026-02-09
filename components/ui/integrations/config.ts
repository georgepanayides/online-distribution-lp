import type React from "react";
import {
  Database,
  ShoppingCart,
  Wallet,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";

export type IntegrationCategoryConfig = {
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

// Keep keys aligned with the data object passed into <IntegrationCircuit />.
export const CATEGORY_CONFIG: Record<string, IntegrationCategoryConfig> = {
  inventory_erps: {
    label: "ERP & Inventory",
    description: "Stock & Order Sync",
    icon: Database,
    color: "#003B5C", // od-dark-blue
    bg: "bg-blue-50",
  },
  shopping_carts: {
    label: "Commerce",
    description: "Multi-Channel Sales",
    icon: ShoppingCart,
    color: "#2B84B1", // od-mid-blue
    bg: "bg-sky-50",
  },
  finance_accounting: {
    label: "Finance",
    description: "Automated Ledger",
    icon: Wallet,
    color: "#0F172A", // slate-900
    bg: "bg-slate-50",
  },
  return_management: {
    label: "Returns",
    description: "Reverse Logistics",
    icon: RefreshCcw,
    color: "#7BAFD4", // od-light-blue
    bg: "bg-cyan-50",
  },
  crms_communications: {
    label: "CX & CRM",
    description: "Customer Alerts",
    icon: MessageSquare,
    color: "#64748B",
    bg: "bg-gray-50",
  },
};
