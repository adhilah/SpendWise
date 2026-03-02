"use client";

import { useState } from "react";

interface BudgetModalProps {
  current: number;
  onSave: (val: number) => void;
  onClose: () => void;
}

export function BudgetModal({ current, onSave, onClose }: BudgetModalProps) {
  const [value, setValue] = useState(String(current));

  const handleSave = () => {
    const n = parseFloat(value);
    if (!isNaN(n) && n > 0) { onSave(n); onClose(); }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(5,7,20,0.85)", backdropFilter:"blur(8px)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      <div className="glass slide-dn" style={{ padding: "32px", width: 340, maxWidth: "90vw" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(0,229,255,0.6)", marginBottom: 20, fontFamily:"'Syne Mono',monospace" }}>
          EDIT MONTHLY BUDGET
        </div>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.25)", fontSize:16 }}>$</span>
          <input
            autoFocus
            className="glass-input"
            style={{ paddingLeft: 28, fontSize: 24, fontWeight: 700 }}
            type="number" min="1" step="1"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") onClose(); }}
          />
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-teal" style={{ flex:1 }} onClick={handleSave}>Save Budget</button>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
