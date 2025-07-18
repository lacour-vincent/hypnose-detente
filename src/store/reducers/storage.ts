import { createReducer } from "@reduxjs/toolkit";

import { type AssetPack, type AssetPackState } from "@/typings/storage";

import { retrieveAssetPackStates } from "@/store/actions/storage";

export interface StorageState {
  states: Record<AssetPack["name"], AssetPackState>;
}

const initialState: StorageState = { states: {} };

export default createReducer(initialState, (builder) => {
  return builder.addCase(retrieveAssetPackStates.success, (state, action) => {
    state.states = action.payload.states;
    return state;
  });
});
