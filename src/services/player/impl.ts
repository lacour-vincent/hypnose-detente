import { AudioModule, type AudioPlayer, createAudioPlayer } from "expo-audio";

import type { OnPlayerStateUpdateEvent, PlayerState, PlayerStatus } from "@/typings/player";

import { PULL_PLAYER_STATE_INTERVAL_IN_MS } from "@/referential/player";
import type { PlayerService } from "@/services/player";

let player: AudioPlayer;

const prepare: PlayerService["prepare"] = async (location) => {
  player = createAudioPlayer(location, { updateInterval: PULL_PLAYER_STATE_INTERVAL_IN_MS });
  AudioModule.setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    interruptionMode: "doNotMix",
  });
  return undefined;
};

const release: PlayerService["release"] = () => {
  if (!player) return undefined;
  player.setActiveForLockScreen(false);
  return player.remove();
};

const setPlay: PlayerService["setPlay"] = (sample, artwork) => {
  if (!player) return undefined;
  player.setActiveForLockScreen(true, { title: sample.label, artworkUrl: artwork });
  return player.play();
};

const setPause: PlayerService["setPause"] = () => {
  if (!player) return undefined;
  return player.pause();
};

const seekTo: PlayerService["seekTo"] = (position) => {
  if (!player) return undefined;
  return player.seekTo(position);
};

const getPlayerState: PlayerService["getPlayerState"] = () => {
  const { playbackState, playing, currentTime, duration } = player.currentStatus;
  const state: PlayerState = {
    status: playbackState as PlayerStatus,
    isPlaying: playing,
    position: currentTime,
    duration: duration,
  };
  return state;
};

const addPlayerStateListener: PlayerService["addPlayerStateListener"] = (listener) => {
  player.addListener("playbackStatusUpdate", (event: OnPlayerStateUpdateEvent) => {
    const { playbackState, playing, currentTime, duration } = event;
    const state: PlayerState = {
      status: playbackState as PlayerStatus,
      isPlaying: playing,
      position: currentTime,
      duration: duration,
    };
    return listener(state);
  });
  return undefined;
};

const removePlayerStateListener: PlayerService["removePlayerStateListener"] = () => {
  player.removeListener("playbackStatusUpdate", () => {});
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
