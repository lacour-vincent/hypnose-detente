import { NativeModule, requireNativeModule } from "expo";

import type { OnPlaybackStateChangedEvent, OnPlayerErrorEvent } from "@/typings/player";

type ExpoExoPlayerModuleEvents = {
  onPlaybackStateChanged: (event: OnPlaybackStateChangedEvent) => void;
  onPlayerError: (event: OnPlayerErrorEvent) => void;
};

declare class ExpoExoPlayerModule extends NativeModule<ExpoExoPlayerModuleEvents> {
  prepare(file: string): void;
  release(): void;
  setPlay(): void;
  setPause(): void;
  isPlaying(): boolean;
  seekTo(position: number): void;
  getCurrentPosition(): number;
  getDuration(): number;
}

export default requireNativeModule<ExpoExoPlayerModule>("ExpoExoPlayer");
