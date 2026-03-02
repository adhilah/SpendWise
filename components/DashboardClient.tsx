"use client";

import { useState, useMemo } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { Header } from "@/budget bar/Header";
import { StatsRow } from "@/budget bar/StatsRow";
import { ExpenseForm } from "@/budget bar/ExpenseForm";
import { CategoryFilter } from "@/budget bar/CategoryFilter";
import { ExpenseList } from "@/budget bar/ExpenseList";
import { BudgetModal } from "@/budget bar/BudgetModal";
import { Category } from "@/types/expense";

export default function DashboardClient() {
  const { expenses, budget, setBudget, addExpense, deleteExpense, loaded } = useExpenses();

  const [showForm,       setShowForm]       = useState(false);
  const [showBudget,     setShowBudget]     = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  const totalSpent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const filtered   = useMemo(() =>
    filterCategory === "All" ? expenses : expenses.filter(e => e.category === filterCategory),
    [expenses, filterCategory]
  );

  if (!loaded) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:11, letterSpacing:4, color:"rgba(0,229,255,0.4)", fontFamily:"'Syne Mono',monospace" }}>
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <>
      {showBudget && (
        <BudgetModal
          current={budget}
          onSave={setBudget}
          onClose={() => setShowBudget(false)}
        />
      )}

      <div style={{ minHeight:"100vh", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 20px 80px" }}>

          <Header
            showForm={showForm}
            onToggle={() => setShowForm(v => !v)}
            totalExpenses={expenses.length}
          />

          {showForm && (
            <ExpenseForm
              onAdd={e => { addExpense(e); setShowForm(false); }}
              onCancel={() => setShowForm(false)}
            />
          )}

          <StatsRow
            totalSpent={totalSpent}
            budget={budget}
            count={expenses.length}
            onBudgetClick={() => setShowBudget(true)}
          />

          <div style={{ marginTop: 16 }}>
            <CategoryFilter
              expenses={expenses}
              active={filterCategory}
              onFilter={setFilterCategory}
            />

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 4px 12px", fontSize:11, letterSpacing:2, color:"rgba(255,255,255,0.25)", fontFamily:"'Syne Mono',monospace" }}>
              <span>{filterCategory === "All" ? "ALL EXPENSES" : filterCategory.toUpperCase()} [{filtered.length}]</span>
            </div>

            <ExpenseList expenses={filtered} onDelete={deleteExpense} />
          </div>

          {/* Footer */}
          <div style={{ textAlign:"center", marginTop:48, fontSize:10, letterSpacing:4, color:"rgba(255,255,255,0.12)", fontFamily:"'Syne Mono',monospace" }}>
            NEXT.JS 14 + TYPESCRIPT · V4
          </div>
        </div>
      </div>
    </>
  );
}
