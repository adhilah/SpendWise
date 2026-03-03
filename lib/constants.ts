// import { CategoryMeta } from "../types/expense";

// export const CATEGORIES: CategoryMeta[] = [
//   { label: "Food",          icon: "🍜", color: "#FF6B9D", glow: "rgba(255,107,157,0.35)", bg: "rgba(255,107,157,0.12)" },
//   { label: "Transport",     icon: "🚌", color: "#00E5FF", glow: "rgba(0,229,255,0.35)",   bg: "rgba(0,229,255,0.10)"  },
//   { label: "Shopping",      icon: "🛍️", color: "#FFD166", glow: "rgba(255,209,102,0.35)", bg: "rgba(255,209,102,0.10)"},
//   { label: "Health",        icon: "💊", color: "#06FFA5", glow: "rgba(6,255,165,0.35)",   bg: "rgba(6,255,165,0.10)"  },
//   { label: "Entertainment", icon: "🎬", color: "#B388FF", glow: "rgba(179,136,255,0.35)", bg: "rgba(179,136,255,0.12)"},
//   { label: "Bills",         icon: "📄", color: "#FF9966", glow: "rgba(255,153,102,0.35)", bg: "rgba(255,153,102,0.10)"},
//   { label: "Other",         icon: "📦", color: "#90A4AE", glow: "rgba(144,164,174,0.25)", bg: "rgba(144,164,174,0.10)"},
// ];

// export const MONTHLY_BUDGET = 2000;

// export const getCategoryMeta = (label: string): CategoryMeta =>
//   CATEGORIES.find((c) => c.label === label) ?? CATEGORIES[6];

// export const SAMPLE_EXPENSES = [
//   { id: "1", title: "Weekly Groceries",  amount: 92.50,  category: "Food"          as const, date: "2026-03-01" },
//   { id: "2", title: "Uber Ride",         amount: 18.00,  category: "Transport"     as const, date: "2026-02-28" },
//   { id: "3", title: "Netflix",           amount: 15.99,  category: "Entertainment" as const, date: "2026-02-27" },
//   { id: "4", title: "Electricity Bill",  amount: 118.00, category: "Bills"         as const, date: "2026-02-26" },
//   { id: "5", title: "Pharmacy",          amount: 29.50,  category: "Health"        as const, date: "2026-02-25" },
//   { id: "6", title: "New Sneakers",      amount: 89.99,  category: "Shopping"      as const, date: "2026-02-24" },
//   { id: "7", title: "Coffee & Lunch",    amount: 22.40,  category: "Food"          as const, date: "2026-02-23" },
// ];

import { CategoryMeta, Category, Expense } from "@/types/expense";

export const CATEGORIES: CategoryMeta[] = [
  { label: "Food", icon: "restaurant", color: "#FF6B9D", glow: "rgba(255,107,157,0.35)", bg: "rgba(255,107,157,0.12)" },
  { label: "Transport", icon: "directions_car", color: "#00E5FF", glow: "rgba(0,229,255,0.35)", bg: "rgba(0,229,255,0.10)" },
  { label: "Shopping", icon: "shopping_bag", color: "#FFD166", glow: "rgba(255,209,102,0.35)", bg: "rgba(255,209,102,0.10)" },
  { label: "Health", icon: "favorite", color: "#06FFA5", glow: "rgba(6,255,165,0.35)", bg: "rgba(6,255,165,0.10)" },
  { label: "Entertainment", icon: "theaters", color: "#B388FF", glow: "rgba(179,136,255,0.35)", bg: "rgba(179,136,255,0.12)" },
  { label: "Bills", icon: "receipt_long", color: "#FF9966", glow: "rgba(255,153,102,0.35)", bg: "rgba(255,153,102,0.10)" },
  { label: "Other", icon: "category", color: "#90A4AE", glow: "rgba(144,164,174,0.25)", bg: "rgba(144,164,174,0.10)" },
];

export const MONTHLY_BUDGET = 2000;

export const SAMPLE_EXPENSES: Expense[] = [
  { id: "1", title: "Groceries", amount: 92.5, category: "Food", date: "2026-03-01" },
  { id: "2", title: "Uber Ride", amount: 18, category: "Transport", date: "2026-02-28" },
  { id: "3", title: "Netflix", amount: 15.99, category: "Entertainment", date: "2026-02-27" },
];

export function getCategoryMeta(label: Category): CategoryMeta {
  return (
    CATEGORIES.find((c) => c.label === label) ??
    CATEGORIES[CATEGORIES.length - 1]
  );
}