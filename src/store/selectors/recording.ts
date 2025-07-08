import type { State } from "@sg/store/reducers";

export const getSamples = (state: State) => state.recording.items;
export const getSelectedSample = (state: State) => state.recording.selected;
