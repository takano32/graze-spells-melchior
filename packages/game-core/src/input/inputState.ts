import type { InputState } from "../types";

export function createInputState(): InputState {
  return { up: false, down: false, left: false, right: false, slow: false };
}
