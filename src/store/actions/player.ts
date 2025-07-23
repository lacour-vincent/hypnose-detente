import type { PlayerState } from "@/typings/player";

import { createAction, createPayloadAction, createRequestPayloadAction } from "@/store/actions";

export const prepare = createRequestPayloadAction<{ file: string }, { state: PlayerState }>("PREPARE_PLAYER");

export const release = createAction("RELEASE_PLAYER");

export const play = createAction("PLAYER_PLAY");

export const pause = createAction("PLAYER_PAUSE");

export const seekTo = createPayloadAction<{ position: number }>("PLAYER_SEEK_TO");

export const startPullPlayerState = createAction("START_PULL_PLAYER_STATE");
export const stopPullPlayerState = createAction("START_PULL_PLAYER_STATE");
export const onPlayerStateUpdate = createPayloadAction<{ state: PlayerState }>("ON_PLAYER_STATE_UPDATE");
