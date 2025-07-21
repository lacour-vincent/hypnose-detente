import type { State } from "@/store/reducers";

export const getAssetPackStates = (state: State) => state.storage.states;

export const getSelectedAssetPack = (state: State) => state.storage.selected;
