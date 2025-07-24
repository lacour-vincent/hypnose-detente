import { PlayerStatus, type onPlayerStatusUpdateEvent } from "@/typings/player";

import type { PlayerState } from "@/store/reducers/player";

import type { PlayerService } from "@/services/player";

class FakePlayer {
  private state: PlayerState;

  constructor() {
    this.state = { status: PlayerStatus.STATE_READY, isPlaying: false, position: 0, duration: 100 };
  }

  release(): void {
    this.state = { status: PlayerStatus.STATE_READY, isPlaying: false, position: 0, duration: 100 };
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

const player = new FakePlayer();

const prepare: PlayerService["prepare"] = () => {
  return undefined;
};

const release: PlayerService["release"] = () => {
  player.release();
  return undefined;
};

const setPlay: PlayerService["setPlay"] = () => {
  player.setPlay();
  return undefined;
};

const setPause: PlayerService["setPause"] = () => {
  player.setPause();
  return undefined;
};

const getPlayerState: PlayerService["getPlayerState"] = () => {
  const state = player.getPlayerState();
  return state;
};

const seekTo: PlayerService["seekTo"] = (position) => {
  player.seekTo(position);
  return undefined;
};

const onPlayerStatusUpdate: PlayerService["onPlayerStatusUpdate"] = (listener) => {
  const event: onPlayerStatusUpdateEvent = { status: PlayerStatus.STATE_READY };
  return setTimeout(() => listener(event), 100);
};

const onPlayerError: PlayerService["onPlayerError"] = () => {
  return undefined;
};

const service: PlayerService = {
  prepare,
  release,
  setPlay,
  setPause,
  seekTo,
  getPlayerState,
  onPlayerStatusUpdate,
  onPlayerError,
};

export default service;
