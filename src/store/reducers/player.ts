import { createReducer } from "@reduxjs/toolkit";

import { type PlayerState as PlayerStateType, PlayerStatus } from "@/typings/player";

import { onPlayerStateEnded, onPlayerStateUpdate, pause, play, prepare, release } from "@/store/actions/player";

export type PlayerState = PlayerStateType;

const initialState: PlayerState = {
  status: PlayerStatus.IDLE,
  isPlaying: false,
  position: 0,
  duration: 0,
};

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(prepare.success, (state, action) => {
      state = action.payload.state;
      return state;
    })
    .addCase(release, () => {
      return initialState;
    })
    .addCase(play, (state) => {
      state.isPlaying = true;
      return state;
    })
    .addCase(pause, (state) => {
      state.isPlaying = false;
      return state;
    })
    .addCase(onPlayerStateUpdate, (state, action) => {
      state = action.payload.state;
      return state;
    })
    .addCase(onPlayerStateEnded, (state) => {
      state.status = PlayerStatus.READY;
      state.isPlaying = false;
      state.position = 0;
    });
});
