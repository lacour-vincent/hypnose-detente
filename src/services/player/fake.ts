import { PlayerStatus } from "@/typings/player";

import type { PlayerState } from "@/store/reducers/player";

import { PULL_PLAYER_STATE_INTERVAL_IN_MS } from "@/referential/player";
import type { PlayerService } from "@/services/player";

class FakeAudioPlayer {
  private state: PlayerState;

  constructor() {
    this.state = { status: PlayerStatus.READY, isPlaying: false, position: 0, duration: 100 };
  }

  release(): void {
    this.state = { status: PlayerStatus.READY, isPlaying: false, position: 0, duration: 100 };
  }

  setPlay(): void {
    this.state.isPlaying = true;
  }

  setPause(): void {
    this.state.isPlaying = false;
  }

  seekTo(position: number): void {
    this.state.position = position;
  }

  getPlayerState(): PlayerState {
    if (this.state.isPlaying) this.state.position += 1;
    return { ...this.state };
  }
}

let player: FakeAudioPlayer;
let interval: ReturnType<typeof setInterval>;

const prepare: PlayerService["prepare"] = () => {
  player = new FakeAudioPlayer();
  return undefined;
};

const release: PlayerService["release"] = () => {
  if (player) player.release();
  return undefined;
};

const setPlay: PlayerService["setPlay"] = () => {
  if (player) player.setPlay();
  return undefined;
};

const setPause: PlayerService["setPause"] = () => {
  if (player) player.setPause();
  return undefined;
};

const seekTo: PlayerService["seekTo"] = (position) => {
  if (player) player.seekTo(position);
  return undefined;
};

const getPlayerState: PlayerService["getPlayerState"] = () => {
  const state = player.getPlayerState();
  return state;
};

const addPlayerStateListener: PlayerService["addPlayerStateListener"] = (listener) => {
  interval = setInterval(() => {
    const state = player.getPlayerState();
    return listener(state);
  }, PULL_PLAYER_STATE_INTERVAL_IN_MS);
  return undefined;
};

const removePlayerStateListener: PlayerService["removePlayerStateListener"] = () => {
  if (interval) clearInterval(interval);
  return undefined;
};

const service: PlayerService = {
  prepare,
  release,
  setPlay,
  setPause,
  seekTo,
  getPlayerState,
  addPlayerStateListener,
  removePlayerStateListener,
};

export default service;
