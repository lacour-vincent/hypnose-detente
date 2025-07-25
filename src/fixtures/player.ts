import { type PlayerState, PlayerStatus } from "@/typings/player";

export const PLAYER_STATE_MOCK: PlayerState = {
  status: PlayerStatus.READY,
  isPlaying: false,
  position: 0,
  duration: 1200,
};
