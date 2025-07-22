import { NativeModule, requireNativeModule } from "expo";

import type { OnPlayerErrorEvent, PlayerState, onPlayerStatusUpdateEvent } from "@/typings/player";

type ExpoExoPlayerModuleEvents = {
  onPlayerStatusUpdate: (event: onPlayerStatusUpdateEvent) => void;
  onPlayerError: (event: OnPlayerErrorEvent) => void;
};

declare class ExpoExoPlayerModule extends NativeModule<ExpoExoPlayerModuleEvents> {
  prepare(file: string): void;
  release(): void;
  setPlay(): void;
  setPause(): void;
  seekTo(position: number): void;
  getPlayerState(): PlayerState;
}

export default requireNativeModule<ExpoExoPlayerModule>("ExpoExoPlayer");
