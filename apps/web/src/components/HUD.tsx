type Props = {
  score: number;
  grazeCount: number;
  spellName: string;
  debug: boolean;
  onDebugToggle: () => void;
  onReset: () => void;
};

const S = {
  hud: {
    fontFamily: "'Courier New', monospace",
    color: "#e8e0ff",
    padding: "8px 0",
    width: "480px",
  } as React.CSSProperties,
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 0",
  } as React.CSSProperties,
  score: { fontSize: "22px", fontWeight: "bold", color: "#ffffff" } as React.CSSProperties,
  graze: { fontSize: "18px", color: "#50ddff" } as React.CSSProperties,
  spell: { fontSize: "11px", color: "rgba(200,180,255,0.6)", letterSpacing: "0.05em" } as React.CSSProperties,
  hint: { fontSize: "11px", color: "rgba(200,180,255,0.4)" } as React.CSSProperties,
  btnRow: { display: "flex", gap: "8px" } as React.CSSProperties,
  btn: {
    background: "rgba(100,60,180,0.25)",
    border: "1px solid rgba(150,100,220,0.4)",
    color: "#c8b8ff",
    padding: "3px 10px",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    fontSize: "12px",
  } as React.CSSProperties,
};

export function HUD({ score, grazeCount, spellName, debug, onDebugToggle, onReset }: Props) {
  return (
    <div style={S.hud}>
      <div style={S.row}>
        <span style={S.score}>Score: {score.toLocaleString()}</span>
        <span style={S.graze}>×{grazeCount} graze</span>
      </div>
      <div style={S.row}>
        <span style={S.spell}>{spellName}</span>
        <div style={S.btnRow}>
          <button style={S.btn} onClick={onDebugToggle}>
            {debug ? "debug ON" : "debug"}
          </button>
          <button style={S.btn} onClick={onReset}>reset [R]</button>
        </div>
      </div>
      <div style={S.hint}>↑↓←→ / WASD move · Shift slow · D debug · R reset</div>
    </div>
  );
}
