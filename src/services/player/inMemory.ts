import { PlayerStatus, type onPlayerStatusUpdateEvent } from "@/typings/player";

import { PLAYER_STATE_MOCK } from "@/fixtures/player";
import type { PlayerService } from "@/services/player";

const prepare: PlayerService["prepare"] = () => {
  return undefined;
};

const release: PlayerService["release"] = () => {
  return undefined;
};

const setPlay: PlayerService["setPlay"] = () => {
  return undefined;
};

const setPause: PlayerService["setPause"] = () => {
  return undefined;
};

const getPlayerState: PlayerService["getPlayerState"] = () => {
  return PLAYER_STATE_MOCK;
};

const seekTo: PlayerService["seekTo"] = () => {
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
