import type { Context } from "@/store/context";

import recording from "@/repositories/recording";
import storage from "@/repositories/storage";
import player from "@/services/player";

const repositories: Context["repositories"] = { recording: recording.inMemory, storage: storage.inMemory };

const services: Context["services"] = { player: player.inMemory };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { repositories, services, router };

export default context;
