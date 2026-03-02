"use client";

import { useMemo } from "react";
import { Expense, Category } from "@/types/expense";
import { CATEGORIES } from "@/lib/constants";

interface CategoryFilterProps {
  expenses: Expense[];
  active: Category | "All";
  onFilter: (cat: Category | "All") => void;
}

export function CategoryFilter({ expenses, active, onFilter }: CategoryFilterProps) {
  const totals = useMemo(() => {
    const m: Partial<Record<Category, number>> = {};
    expenses.forEach(e => { m[e.category] = (m[e.category] ?? 0) + e.amount; });
    return m;
  }, [expenses]);

  const used = CATEGORIES.filter(c => totals[c.label] !== undefined);

  return (
    <div className="glass" style={{ padding: "18px 20px", marginBottom: 16 }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.25)", marginBottom: 14, fontFamily:"'Syne Mono',monospace" }}>
        FILTER BY CATEGORY
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {/* All */}
        <button
          onClick={() => onFilter("All")}
          style={{
            padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", border: "1px solid",
            borderColor: active === "All" ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.08)",
            background: active === "All" ? "rgba(0,229,255,0.12)" : "transparent",
            color: active === "All" ? "#00E5FF" : "rgba(255,255,255,0.4)",
            transition: "all 0.15s",
          }}
        >
          All · {expenses.length}
        </button>

        {used.map(cat => {
          const isActive = active === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => onFilter(isActive ? "All" : cat.label)}
              style={{
                padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", border: "1px solid",
                borderColor: isActive ? cat.color + "80" : "rgba(255,255,255,0.08)",
                background: isActive ? cat.bg : "transparent",
                color: isActive ? cat.color : "rgba(255,255,255,0.4)",
                transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 5,
                boxShadow: isActive ? `0 0 12px ${cat.glow}` : "none",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{ opacity: 0.7 }}>${totals[cat.label]!.toFixed(0)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
