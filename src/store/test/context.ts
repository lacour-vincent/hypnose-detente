import type { Context } from "@/store/context";

import recording from "@/repositories/recording";
import storage from "@/repositories/storage";
import battery from "@/services/battery";
import foreground from "@/services/foreground";
import permissions from "@/services/permissions";
import player from "@/services/player";

const repositories: Context["repositories"] = { recording: recording.fake, storage: storage.fake };

const services: Context["services"] = {
  battery: battery.fake,
  player: player.fake,
  foreground: foreground.fake,
  permissions: permissions.fake,
};

const router: Context["router"] = {
  navigate: () => true,
  replace: () => true,
};

const context: Context = { repositories, services, router };

export default context;
