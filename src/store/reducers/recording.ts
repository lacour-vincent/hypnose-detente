import { createReducer } from "@reduxjs/toolkit";

import type { Sample } from "@sg/typings/recording";

import { retrieveSampleById, retrieveSamples } from "@sg/store/actions/recording";

import { SAMPLE_EMPTY } from "@sg/fixtures/recording";

export interface RecordingState {
  items: Sample[];
  selected: Sample;
}

const initialState: RecordingState = { items: [], selected: SAMPLE_EMPTY };

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(retrieveSamples.success, (state, action) => {
      state.items = action.payload.samples;
      return state;
    })
    .addCase(retrieveSampleById.success, (state, action) => {
      state.selected = action.payload.sample;
      return state;
    });
});
