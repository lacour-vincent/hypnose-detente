import type { Context } from "@/store/context";

import recording from "@/repositories/recording";
import storage from "@/repositories/storage";
import player from "@/services/player";

const repositories: Context["repositories"] = { recording: recording.fake, storage: storage.fake };

const services: Context["services"] = { player: player.fake };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { repositories, services, router };

export default context;
