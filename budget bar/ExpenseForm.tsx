"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Expense, Category } from "@/types/expense";
import { CATEGORIES } from "@/lib/constants";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
  onCancel: () => void;
}

export function ExpenseForm({ onAdd, onCancel }: ExpenseFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Description is required.");
      return;
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid amount greater than 0.");
      return;
    }

    setError("");

    onAdd({
      id: uuid(),
      title: trimmed,
      amount: Number(numAmount.toFixed(2)),
      category,
      date,
    });
  };

  // Find icon right where it's used (more predictable)
  const selectedCategory = CATEGORIES.find((c) => c.label === category);
  const icon = selectedCategory?.icon ?? " "; //

  return (
    <div
      className="glass slide-dn"
      style={{
        padding: "24px 26px",
        marginBottom: 20,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: "rgba(0,229,255,0.6)",
          marginBottom: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
        }}
      >
        ↳ NEW EXPENSE
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <input
          className="glass-input"
          placeholder="Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
          style={{ fontFamily: "inherit" }}
        />
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.3)",
              fontSize: 15,
              pointerEvents: "none",
            }}
          >
            $
          </span>
          <input
            className="glass-input"
            style={{ paddingLeft: 28, fontFamily: "inherit" }}
            placeholder="0.00"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 18,
              pointerEvents: "none",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1,
            }}
            className="material-symbols-outlined"
          >
            {icon}
          </span>

          <select
            className="glass-input"
            style={{
              paddingLeft: 42,
              appearance: "none",
              fontFamily: "inherit",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <input
          className="glass-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ fontFamily: "inherit" }}
        />
      </div>

      {error && (
        <p
          style={{
            fontSize: 12.5,
            color: "#FF6B9D",
            marginBottom: 14,
            fontFamily: "inherit",
          }}
        >
          • {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-teal" style={{ flex: 1 }} onClick={handleSubmit}>
          Add Expense
        </button>
        <button className="btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}