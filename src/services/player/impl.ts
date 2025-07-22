import ExoPlayerModule from "@modules/expo-exo-player";

import type { PlayerService } from "@/services/player";

const prepare: PlayerService["prepare"] = (file) => {
  ExoPlayerModule.prepare(file);
  return undefined;
};

const release: PlayerService["release"] = () => {
  ExoPlayerModule.release();
  return undefined;
};

const setPlay: PlayerService["setPlay"] = () => {
  ExoPlayerModule.setPlay();
  return undefined;
};

const setPause: PlayerService["setPause"] = () => {
  ExoPlayerModule.setPause();
  return undefined;
};

const seekTo: PlayerService["seekTo"] = (position) => {
  ExoPlayerModule.seekTo(position);
  return undefined;
};

const getPlayerState: PlayerService["getPlayerState"] = () => {
  const state = ExoPlayerModule.getPlayerState();
  return state;
};

const onPlayerStatusUpdate: PlayerService["onPlayerStatusUpdate"] = (listener) => {
  ExoPlayerModule.addListener("onPlayerStatusUpdate", listener);
  return undefined;
};

const onPlayerError: PlayerService["onPlayerError"] = (listener) => {
  ExoPlayerModule.addListener("onPlayerError", listener);
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
