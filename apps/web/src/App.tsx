import { useState, useRef, useCallback, useEffect } from "react";
import { createWorld, createInputState, type WorldState, type InputState } from "@graze-spells/game-core";
import { GameCanvas } from "./game/GameCanvas";
import { HUD } from "./components/HUD";

const FIELD_W = 480;
const FIELD_H = 640;

type DisplayState = { score: number; grazeCount: number; status: string; intensity: number };

export function App() {
  const worldRef = useRef<WorldState>(createWorld(FIELD_W, FIELD_H));
  const inputRef = useRef<InputState>(createInputState());
  const [display, setDisplay] = useState<DisplayState>({ score: 0, grazeCount: 0, status: "playing", intensity: 0 });
  const [debug, setDebug] = useState(false);

  const reset = useCallback(() => {
    worldRef.current = createWorld(FIELD_W, FIELD_H);
  }, []);

  // Keyboard shortcuts not in useInput: D for debug, R for reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "KeyD" && !e.repeat) setDebug((v) => !v);
      if (e.code === "KeyR" && !e.repeat) reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  // Keyboard movement input — attach directly here so we can pass inputRef
  useEffect(() => {
    const KEY_MAP: Record<string, keyof InputState> = {
      ArrowUp: "up", KeyW: "up",
      ArrowDown: "down", KeyS: "down",
      ArrowLeft: "left", KeyA: "left",
      ArrowRight: "right", KeyD: "right",
      ShiftLeft: "slow", ShiftRight: "slow",
    };
    const dn = (e: KeyboardEvent) => {
      const k = KEY_MAP[e.code];
      if (k) { e.preventDefault(); inputRef.current[k] = true; }
    };
    const up = (e: KeyboardEvent) => {
      const k = KEY_MAP[e.code];
      if (k) inputRef.current[k] = false;
    };
    const blur = () => {
      (Object.keys(inputRef.current) as (keyof InputState)[]).forEach(
        (k) => (inputRef.current[k] = false)
      );
    };
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", dn);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const spellName = worldRef.current.spell.name;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <h1 style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "14px",
        letterSpacing: "0.2em",
        color: "rgba(200,180,255,0.5)",
        marginBottom: "4px",
        textTransform: "uppercase",
      }}>
        Graze Spells: Melchior
      </h1>

      <HUD
        score={display.score}
        grazeCount={display.grazeCount}
        intensity={display.intensity}
        spellName={spellName}
        debug={debug}
        onDebugToggle={() => setDebug((v) => !v)}
        onReset={reset}
      />

      <div style={{ position: "relative", lineHeight: 0 }}>
        <GameCanvas
          worldRef={worldRef}
          inputRef={inputRef}
          onFrame={setDisplay}
        />

        {display.status === "gameOver" && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,0,20,0.75)",
            gap: "16px",
          }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "32px",
              color: "#ff3377",
              letterSpacing: "0.15em",
            }}>
              GAME OVER
            </p>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "16px",
              color: "#e8e0ff",
            }}>
              Score: {display.score.toLocaleString()} · ×{display.grazeCount} graze
            </p>
            <button
              onClick={reset}
              style={{
                background: "rgba(100,60,180,0.4)",
                border: "1px solid rgba(200,100,220,0.7)",
                color: "#e8e0ff",
                padding: "10px 28px",
                cursor: "pointer",
                fontFamily: "'Courier New', monospace",
                fontSize: "16px",
                letterSpacing: "0.1em",
              }}
            >
              Try Again [R]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
