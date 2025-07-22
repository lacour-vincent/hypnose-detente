import type { PlayerState } from "@/typings/player";

import { createAction, createPayloadAction, createRequestPayloadAction } from "@/store/actions";

export const prepare = createRequestPayloadAction<{ file: string }, { state: PlayerState }>("PREPARE_PLAYER");

export const release = createAction("RELEASE_PLAYER");

export const playOrPause = createAction("PLAY_OR_PAUSE");

export const seekTo = createPayloadAction<{ position: number }>("SEEK_TO");
