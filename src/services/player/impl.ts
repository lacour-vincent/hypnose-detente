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

const isPlaying: PlayerService["isPlaying"] = () => {
  const playing = ExoPlayerModule.isPlaying();
  return playing;
};

const seekTo: PlayerService["seekTo"] = (position) => {
  ExoPlayerModule.seekTo(position);
  return undefined;
};

const getCurrentPosition: PlayerService["getCurrentPosition"] = () => {
  const position = ExoPlayerModule.getCurrentPosition();
  return position;
};

const getDuration: PlayerService["getDuration"] = () => {
  const duration = ExoPlayerModule.getDuration();
  return duration;
};

const onPlaybackStateChanged: PlayerService["onPlaybackStateChanged"] = (listener) => {
  ExoPlayerModule.addListener("onPlaybackStateChanged", listener);
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
  isPlaying,
  seekTo,
  getCurrentPosition,
  getDuration,
  onPlaybackStateChanged,
  onPlayerError,
};

export default service;
