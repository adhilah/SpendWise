"use client";

interface StatsRowProps {
  totalSpent: number;
  budget: number;
  count: number;
  onBudgetClick: () => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export function StatsRow({ totalSpent, budget, count, onBudgetClick }: StatsRowProps) {
  const remaining = budget - totalSpent;
  const isOver    = remaining < 0;
  const pct       = Math.min((totalSpent / budget) * 100, 100);
  const barColor  = isOver
    ? "linear-gradient(90deg,#FF6B9D,#FF3B3B)"
    : pct > 75
    ? "linear-gradient(90deg,#FFD166,#FF9966)"
    : "linear-gradient(90deg,#00E5FF,#06FFA5)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* 3 stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {/* Spent */}
        <div className="glass glass-lift" style={{ padding: "20px 22px" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 10, fontFamily:"'Syne Mono',monospace" }}>
            TOTAL SPENT
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isOver ? "#FF6B9D" : "#E8EAFF", letterSpacing: -1, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginBottom: 6 }}>
            {fmt(totalSpent)}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            of {fmt(budget)}
          </div>
        </div>

        {/* Remaining */}
        <div className="glass glass-lift" style={{ padding: "20px 22px", borderColor: isOver ? "rgba(255,107,157,0.3)" : undefined }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 10, fontFamily:"'Syne Mono',monospace" }}>
            REMAINING
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isOver ? "#FF6B9D" : "#06FFA5", letterSpacing: -1, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginBottom: 6 }}>
            {isOver ? "-" : ""}{fmt(Math.abs(remaining))}
          </div>
          <div style={{ fontSize: 11, color: isOver ? "rgba(255,107,157,0.6)" : "rgba(255,255,255,0.3)" }}>
            {isOver ? "⚠ over budget" : "available"}
          </div>
        </div>

        {/* Budget - clickable */}
        <div
          className="glass glass-lift"
          onClick={onBudgetClick}
          style={{ padding: "20px 22px", cursor: "pointer", borderColor: "rgba(0,229,255,0.15)" }}
          title="Click to edit budget"
        >
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(0,229,255,0.5)", marginBottom: 10, fontFamily:"'Syne Mono',monospace" }}>
            BUDGET ✎
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "rgba(0,229,255,0.8)", letterSpacing: -1, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginBottom: 6 }}>
            {fmt(budget)}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {count} expense{count !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.3)", fontFamily:"'Syne Mono',monospace" }}>
            BUDGET USAGE
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: isOver ? "#FF6B9D" : "#00E5FF", fontFamily:"'Syne Mono',monospace" }}>
            {pct.toFixed(1)}%
          </span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 8, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: barColor,
            borderRadius: 99,
            transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: isOver ? "0 0 12px rgba(255,107,157,0.6)" : "0 0 12px rgba(0,229,255,0.5)",
          }} />
        </div>
      </div>
    </div>
  );
}
