"use client";

interface HeaderProps {
  showForm: boolean;
  onToggle: () => void;
  totalExpenses: number;
}

export function Header({ showForm, onToggle, totalExpenses }: HeaderProps) {
  const now   = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year  = now.getFullYear();

  return (
    <header style={{ position: "relative", zIndex: 10, marginBottom: 32 }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(0,229,255,0.7)", marginBottom: 8, fontFamily: "'Syne Mono', monospace" }}>
            {month.toUpperCase()} {year} — TRACKER
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 54px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -1.5,
            background: "linear-gradient(135deg, #E8EAFF 0%, #00E5FF 50%, #B388FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 6,
          }}>
            Expense<br />Tracker
          </h1>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'Syne Mono', monospace" }}>
            {totalExpenses} transaction{totalExpenses !== 1 ? "s" : ""} this month
          </div>
        </div>

        <button
          onClick={onToggle}
          className={showForm ? "btn-ghost" : "btn-teal"}
          style={{ marginTop: 8, minWidth: 120 }}
        >
          {showForm ? "✕  Cancel" : "+ Add New"}
        </button>
      </div>

      {/* Decorative line */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, rgba(0,229,255,0.4), rgba(179,136,255,0.4), transparent)",
        marginTop: 24,
      }} />
    </header>
  );
}
