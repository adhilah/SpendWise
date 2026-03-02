// "use client";

// import { useState } from "react";
// import { v4 as uuid } from "uuid";
// import { Expense, Category } from "@/types/expense";
// import { CATEGORIES } from "@/lib/constants";

// interface ExpenseFormProps {
//   onAdd: (expense: Expense) => void;
//   onCancel: () => void;
// }

// export function ExpenseForm({ onAdd, onCancel }: ExpenseFormProps) {
//   const today = new Date().toISOString().split("T")[0];
//   const [title,    setTitle]    = useState("");
//   const [amount,   setAmount]   = useState("");
//   const [category, setCategory] = useState<Category>("Food");
//   const [date,     setDate]     = useState(today);
//   const [error,    setError]    = useState("");

//   const selectedCat = CATEGORIES.find(c => c.label === category)!;

//   const handleSubmit = () => {
//     if (!title.trim())                              { setError("Description is required."); return; }
//     if (!amount || parseFloat(amount) <= 0)         { setError("Enter a valid amount.");    return; }
//     setError("");
//     onAdd({ id: uuid(), title: title.trim(), amount: parseFloat(parseFloat(amount).toFixed(2)), category, date });
//   };

//   return (
//     <div className="glass slide-dn" style={{ padding: "24px 26px", marginBottom: 20 }}>
//       <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(0,229,255,0.6)", marginBottom: 20, fontFamily: "'Syne Mono',monospace" }}>
//         ↳ NEW EXPENSE
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
//         <input className="glass-input" placeholder="Description" value={title}
//           onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
//         <div style={{ position: "relative" }}>
//           <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.25)", fontSize:14, pointerEvents:"none" }}>$</span>
//           <input className="glass-input" style={{ paddingLeft: 26 }} placeholder="0.00" type="number" min="0" step="0.01"
//             value={amount} onChange={e => setAmount(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
//         <div style={{ position: "relative" }}>
//           <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:17, pointerEvents:"none" }}>
//             {selectedCat.icon}
//           </span>
//           <select className="glass-input" style={{ paddingLeft: 38, appearance: "none" }}
//             value={category} onChange={e => setCategory(e.target.value as Category)}>
//             {CATEGORIES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
//           </select>
//         </div>
//         <input className="glass-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
//       </div>

//       {error && <p style={{ fontSize: 12, color: "#FF6B9D", marginBottom: 12 }}>{error}</p>}

//       <div style={{ display: "flex", gap: 10 }}>
//         <button className="btn-teal" style={{ flex: 1 }} onClick={handleSubmit}>Add Expense</button>
//         <button className="btn-ghost" onClick={onCancel}>Cancel</button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Expense, Category } from "@/types/expense";
import { CATEGORIES } from "@/lib/constants";

// Optional: add this near the top of your file or in global CSS
// :root {
//   --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
//   --font-mono: 'JetBrains Mono', ui-monospace, monospace;
// }

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

  const selectedCat = CATEGORIES.find((c) => c.label === category)!;

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Description is required.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    setError("");
    onAdd({
      id: uuid(),
      title: title.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      date,
    });
  };

  return (
    <div
      className="glass slide-dn"
      style={{
        padding: "24px 26px",
        marginBottom: 20,
        fontFamily: "'Inter', system-ui, sans-serif", // ← main change
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: "rgba(0,229,255,0.6)",
          marginBottom: 20,
          fontFamily: "'JetBrains Mono', monospace", // nicer mono for accent
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
          style={{ fontFamily: "inherit" }} // inherit from parent
        />
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.25)",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            $
          </span>
          <input
            className="glass-input"
            style={{ paddingLeft: 26, fontFamily: "inherit" }}
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
              fontSize: 17,
              pointerEvents: "none",
            }}
          >
            {selectedCat.icon}
          </span>
          <select
            className="glass-input"
            style={{ paddingLeft: 38, appearance: "none", fontFamily: "inherit" }}
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
        <p style={{ fontSize: 12, color: "#FF6B9D", marginBottom: 12, fontFamily: "inherit" }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-teal" style={{ flex: 1 }} onClick={handleSubmit}>
          Add Expense
        </button>
        <button className="btn-ghost" onClick={onCancel}>
          Cancel
        </button>

        <span
  className="material-symbols-outlined"
  style={{
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 26,                       // ↑ larger = more visible, helps debugging
    pointerEvents: "none",
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1,
  }}
>
  {selectedCat.icon}
</span>
      </div>
    </div>
  );
}