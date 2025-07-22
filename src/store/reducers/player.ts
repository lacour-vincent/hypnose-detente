import { createReducer } from "@reduxjs/toolkit";

import { type PlayerState as PlayerStateType, PlayerStatus } from "@/typings/player";

import { playOrPause, prepare, release } from "@/store/actions/player";

export interface PlayerState extends PlayerStateType {
  status: PlayerStatus;
}

const initialState: PlayerState = {
  status: PlayerStatus.STATE_IDLE,
  isPlaying: false,
  position: 0,
  duration: 0,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(prepare.success, (state, action) => {
      state.status = PlayerStatus.STATE_READY;
      state.isPlaying = action.payload.state.isPlaying;
      state.position = action.payload.state.position;
      state.duration = action.payload.state.duration;
      return state;
    })
    .addCase(release, () => {
      return initialState;
    })
    .addCase(playOrPause, (state) => {
      state.isPlaying = !state.isPlaying;
      return state;
    });
});
