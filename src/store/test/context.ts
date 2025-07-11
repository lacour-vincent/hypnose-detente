import type { Context } from "@/store/context";

import recording from "@/repositories/recording";

const repositories: Context["repositories"] = { recording: recording.inMemory };

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { repositories, router };

export default context;
