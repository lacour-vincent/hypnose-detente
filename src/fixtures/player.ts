import { type PlayerState, PlayerStatus } from "@/typings/player";

export const PLAYER_STATE_MOCK: PlayerState = {
  status: PlayerStatus.STATE_READY,
  isPlaying: false,
  position: 0,
  duration: 1000,
};
