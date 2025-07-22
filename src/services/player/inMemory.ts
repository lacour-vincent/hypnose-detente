import { type OnPlaybackStateChangedEvent, PlayerState } from "@/typings/player";

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

const isPlaying: PlayerService["isPlaying"] = () => {
  return false;
};

const seekTo: PlayerService["seekTo"] = () => {
  return undefined;
};

const getCurrentPosition: PlayerService["getCurrentPosition"] = () => {
  return 0;
};

const getDuration: PlayerService["getDuration"] = () => {
  return 0;
};

const onPlaybackStateChanged: PlayerService["onPlaybackStateChanged"] = (listener) => {
  const event: OnPlaybackStateChangedEvent = { state: PlayerState.STATE_READY };
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
  isPlaying,
  seekTo,
  getCurrentPosition,
  getDuration,
  onPlaybackStateChanged,
  onPlayerError,
};

export default service;
