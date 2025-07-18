import type { Context } from "@/store/context";

import recording from "@/repositories/recording";
import storage from "@/repositories/storage";

const repositories: Context["repositories"] = { recording: recording.inMemory, storage: storage.inMemory };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { repositories, router };

export default context;
