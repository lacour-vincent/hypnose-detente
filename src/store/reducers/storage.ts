import { createReducer } from "@reduxjs/toolkit";

import { type AssetPack, type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { clearSelectedSample } from "@/store/actions/recording";
import { retrieveAssetPack, retrieveAssetPackStates } from "@/store/actions/storage";

import { ASSET_PACK_EMPTY } from "@/fixtures/storage";

export interface StorageState {
  states: AssetPackStates;
  selected: AssetPack;
}

const initialState: StorageState = { states: {}, selected: ASSET_PACK_EMPTY };

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(retrieveAssetPackStates.success, (state, action) => {
      state.states = action.payload.states;
      return state;
    })
    .addCase(retrieveAssetPack.success, (state, action) => {
      const { pack } = action.payload;
      state.states[pack.name] = { name: pack.name, status: AssetPackStatus.COMPLETED };
      state.selected = pack;
      return state;
    })
    .addCase(clearSelectedSample, (state) => {
      state.selected = initialState.selected;
      return state;
    });
});
