import { useEffect, useRef, type MutableRefObject } from "react";
import { Application } from "pixi.js";
import { updateWorld, type WorldState, type InputState } from "@graze-spells/game-core";
import { createPixiRenderer } from "./pixiRenderer";

type FrameInfo = { score: number; grazeCount: number; status: string; intensity: number };

type Props = {
  worldRef: MutableRefObject<WorldState>;
  inputRef: MutableRefObject<InputState>;
  onFrame: (info: FrameInfo) => void;
};

export function GameCanvas({ worldRef, inputRef, onFrame }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onFrameRef   = useRef(onFrame);
  useEffect(() => { onFrameRef.current = onFrame; });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let app: Application | null = null;
    let mounted = true;

    (async () => {
      const { fieldWidth: W, fieldHeight: H } = worldRef.current;
      const a = new Application();

      await a.init({
        width: W,
        height: H,
        backgroundColor: 0x04000e,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (!mounted) { a.destroy(true); return; }

      app = a;
      container.appendChild(a.canvas);

      const renderer = createPixiRenderer(a);

      a.ticker.add((ticker) => {
        const dt = Math.min(ticker.deltaMS / 1000, 0.05);
        worldRef.current = updateWorld(worldRef.current, inputRef.current, dt);
        renderer.update(worldRef.current, inputRef.current, dt);
        const { score, grazeCount } = worldRef.current.score;
        const intensity = worldRef.current.spell.intensity;
        onFrameRef.current({ score, grazeCount, status: worldRef.current.status, intensity });
      });
    })();

    return () => {
      mounted = false;
      app?.destroy(true, { children: true });
    };
  }, [worldRef, inputRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} style={{ lineHeight: 0 }} />;
}
