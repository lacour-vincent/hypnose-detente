import type { PlayerState } from "@/typings/player";

import fake from "./fake";
import impl from "./impl";

export interface PlayerService {
  prepare: (location: string) => void;
  release: () => void;
  setPlay: () => void;
  setPause: () => void;
  seekTo: (position: number) => void;
  getPlayerState: () => PlayerState;
  addPlayerStateListener: (listener: (state: PlayerState) => void) => void;
  removePlayerStateListener: () => void;
}

export default { impl, fake };
