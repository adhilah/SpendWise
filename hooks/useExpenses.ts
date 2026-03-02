"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense } from "../types/expense";
import { SAMPLE_EXPENSES, MONTHLY_BUDGET } from "../lib/constants";

const STORAGE_KEY = "etv4_expenses";
const BUDGET_KEY  = "etv4_budget";

export function useExpenses() {
  const [expenses, setExpenses]   = useState<Expense[]>([]);
  const [budget,   setBudgetVal]  = useState<number>(MONTHLY_BUDGET);
  const [loaded,   setLoaded]     = useState(false);

  // ─── Load from localStorage on first render ───────────────────────
  useEffect(() => {
    try {
      const raw    = localStorage.getItem(STORAGE_KEY);
      const rawBud = localStorage.getItem(BUDGET_KEY);
      setExpenses(raw    ? JSON.parse(raw)  : SAMPLE_EXPENSES);
      setBudgetVal(rawBud ? Number(rawBud)  : MONTHLY_BUDGET);
    } catch {
      setExpenses(SAMPLE_EXPENSES);
    }
    setLoaded(true);
  }, []); // ← empty array = runs once on mount

  // ─── Add ──────────────────────────────────────────────────────────
  const addExpense = useCallback((e: Expense) => {
    setExpenses((prev) => {
      const next = [e, ...prev]; // new expense goes to the top
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────
  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // ─── Update budget ────────────────────────────────────────────────
  const setBudget = useCallback((val: number) => {
    localStorage.setItem(BUDGET_KEY, String(val));
    setBudgetVal(val);
  }, []);

  return {
    expenses,       // Expense[]  — all expenses
    budget,         // number     — monthly budget
    setBudget,      // (n) => void
    addExpense,     // (e) => void
    deleteExpense,  // (id) => void
    loaded,         // boolean — false until localStorage is read
  };
}