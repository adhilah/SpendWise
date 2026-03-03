// "use client";

// import { useState } from "react";
// import { Expense } from "@/types/expense";
// import { getCategoryMeta } from "@/lib/constants";

// interface ExpenseListProps {
//   expenses: Expense[];
//   onDelete: (id: string) => void;
// }

// const fmt = (n: number) =>
//   new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

// const fmtDate = (iso: string) =>
//   new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

// export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
//   const [confirmId, setConfirmId] = useState<string | null>(null);

//   if (expenses.length === 0) {
//     return (
//       <div className="glass" style={{ padding: "56px 24px", textAlign: "center" }}>
//         <div style={{ fontSize: 44, marginBottom: 14 }}>🛸</div>
//         <div style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontFamily:"'Syne Mono',monospace" }}>
//           NO EXPENSES FOUND
//         </div>
//       </div>
//     );
//   }

//   // Group by date
//   const grouped: Record<string, Expense[]> = {};
//   expenses.forEach(e => {
//     if (!grouped[e.date]) grouped[e.date] = [];
//     grouped[e.date].push(e);
//   });
//   const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

//   const dateLabel = (iso: string) => {
//     const d    = new Date(iso + "T00:00:00");
//     const now  = new Date(); now.setHours(0,0,0,0);
//     const diff = Math.round((now.getTime() - d.getTime()) / 86400000);
//     if (diff === 0) return "Today";
//     if (diff === 1) return "Yesterday";
//     return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
//   };

//   return (
//     <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//       {sortedDates.map(date => (
//         <div key={date}>
//           {/* Date header */}
//           <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 4px 8px", fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.25)", fontFamily:"'Syne Mono',monospace" }}>
//             <span>{dateLabel(date)}</span>
//             <span>${grouped[date].reduce((s,e) => s + e.amount, 0).toFixed(2)}</span>
//           </div>

//           {grouped[date].map(expense => {
//             const cat = getCategoryMeta(expense.category);
//             return (
//               <div
//                 key={expense.id}
//                 className="glass glass-lift"
//                 style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}
//               >
//                 {/* Icon */}
//                 <div style={{
//                   width: 46, height: 46, borderRadius: 14,
//                   background: cat.bg,
//                   border: `1px solid ${cat.color}40`,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 22, flexShrink: 0,
//                   boxShadow: `0 0 16px ${cat.glow}`,
//                 }}>
//                   {cat.icon}
//                 </div>

//                 {/* Info */}
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                     {expense.title}
//                   </div>
//                   <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                     <span style={{
//                       fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
//                       color: cat.color, background: cat.bg,
//                       border: `1px solid ${cat.color}40`,
//                       padding: "2px 8px", borderRadius: 99,
//                     }}>
//                       {expense.category.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Amount */}
//                 <div style={{ fontSize: 17, fontWeight: 700, color: "#E8EAFF", fontVariantNumeric: "tabular-nums", marginRight: 8, flexShrink: 0 }}>
//                   {fmt(expense.amount)}
//                 </div>

//                 {/* Delete */}
//                 {confirmId === expense.id ? (
//                   <div style={{ display: "flex", gap: 6 }}>
//                     <button
//                       onClick={() => { onDelete(expense.id); setConfirmId(null); }}
//                       style={{ background: "rgba(255,107,157,0.15)", border: "1px solid rgba(255,107,157,0.4)", color: "#FF6B9D", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => setConfirmId(null)}
//                       style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
//                     >
//                       No
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setConfirmId(expense.id)}
//                     style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.15)", cursor: "pointer", padding: "6px 8px", borderRadius: 8, fontSize: 15, lineHeight: 1, transition: "color 0.15s" }}
//                     onMouseEnter={e => (e.currentTarget.style.color = "#FF6B9D")}
//                     onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.15)")}
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useState, CSSProperties } from "react";
import { Expense } from "@/types/expense";
import { getCategoryMeta } from "@/lib/constants";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

function Icon({
  name,
  size = 22,
  color = "inherit",
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className="material-symbols-rounded"
      style={{
        fontSize: size,
        color,
        userSelect: "none",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        fontVariationSettings: "'FILL' 0",
        ...style,
      }}
    >
      {name}
    </span>
  );
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (expenses.length === 0) {
    return (
      <div className="glass" style={{ padding: "56px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <Icon name="receipt_long" size={44} color="rgba(255,255,255,0.2)" />
        </div>
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: 2,
            fontFamily: "'Syne Mono',monospace",
          }}
        >
          NO EXPENSES FOUND
        </div>
      </div>
    );
  }

  const grouped: Record<string, Expense[]> = {};
  expenses.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const dateLabel = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = Math.round((now.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {sortedDates.map((date) => (
        <div key={date}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 4px 8px",
              fontSize: 11,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Syne Mono',monospace",
            }}
          >
            <span>{dateLabel(date)}</span>
            <span>
              ${grouped[date].reduce((s, e) => s + e.amount, 0).toFixed(2)}
            </span>
          </div>

          {grouped[date].map((expense) => {
            const cat = getCategoryMeta(expense.category);

            return (
              <div
                key={expense.id}
                className="glass glass-lift"
                style={{
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 8,
                }}
              >
                {/* Category Icon */}
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: cat.bg,
                    border: `1px solid ${cat.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 0 16px ${cat.glow}`,
                  }}
                >
                  <Icon name={cat.icon} size={22} color={cat.color} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {expense.title}
                  </div>

                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      color: cat.color,
                      background: cat.bg,
                      border: `1px solid ${cat.color}40`,
                      padding: "2px 8px",
                      borderRadius: 99,
                    }}
                  >
                    {expense.category.toUpperCase()}
                  </span>
                </div>

                {/* Amount */}
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#E8EAFF",
                    fontVariantNumeric: "tabular-nums",
                    marginRight: 8,
                    flexShrink: 0,
                  }}
                >
                  {fmt(expense.amount)}
                </div>

                {/* Delete */}
                {confirmId === expense.id ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => {
                        onDelete(expense.id);
                        setConfirmId(null);
                      }}
                      style={{
                        background: "rgba(255,107,157,0.15)",
                        border: "1px solid rgba(255,107,157,0.4)",
                        color: "#FF6B9D",
                        borderRadius: 8,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Icon name="delete" size={14} color="#FF6B9D" />
                      Delete
                    </button>

                    <button
                      onClick={() => setConfirmId(null)}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.3)",
                        borderRadius: 8,
                        padding: "5px 10px",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(expense.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.15)",
                      cursor: "pointer",
                      padding: "6px 8px",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}