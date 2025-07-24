export enum PlayerStatus {
  IDLE = "idle",
  BUFFERING = "buffering",
  READY = "ready",
  ENDED = "ended",
}

export interface PlayerState {
  status: PlayerStatus;
  isPlaying: boolean;
  position: number;
  duration: number;
}

export interface OnPlayerStateUpdateEvent {
  playbackState: string;
  playing: boolean;
  currentTime: number;
  duration: number;
}
