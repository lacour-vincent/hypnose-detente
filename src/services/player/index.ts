import type { OnPlayerErrorEvent, PlayerState, onPlayerStatusUpdateEvent } from "@/typings/player";

import impl from "./impl";
import inMemory from "./inMemory";

export interface PlayerService {
  prepare: (file: string) => void;
  release: () => void;
  setPlay: () => void;
  setPause: () => void;
  seekTo: (position: number) => void;
  getPlayerState: () => PlayerState;
  onPlayerStatusUpdate: (listener: (event: onPlayerStatusUpdateEvent) => void) => void;
  onPlayerError: (listener: (event: OnPlayerErrorEvent) => void) => void;
}

export default { impl, inMemory };
