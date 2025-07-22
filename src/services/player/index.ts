import type { OnPlaybackStateChangedEvent, OnPlayerErrorEvent } from "@/typings/player";

import impl from "./impl";
import inMemory from "./inMemory";

export interface PlayerService {
  prepare: (file: string) => void;
  release: () => void;
  setPlay: () => void;
  setPause: () => void;
  isPlaying: () => boolean;
  seekTo: (position: number) => void;
  getCurrentPosition: () => number;
  getDuration: () => number;
  onPlaybackStateChanged: (listener: (event: OnPlaybackStateChangedEvent) => void) => void;
  onPlayerError: (listener: (event: OnPlayerErrorEvent) => void) => void;
}

export default { impl, inMemory };
