import { type ConfigPlugin, withAppBuildGradle, withDangerousMod, withPlugins } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

const withAndroidSigning: ConfigPlugin = (config) => {
  return withPlugins(config, [withCopyEasBuildGradle, withEasBuildGradle]);
};

const withCopyEasBuildGradle: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const src = path.resolve(__dirname, "eas-build.gradle");
      const dest = path.join(config.modRequest.platformProjectRoot, "app", "eas-build.gradle");
      fs.copyFileSync(src, dest);
      return config;
    },
  ]);
};

const withEasBuildGradle: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes("eas-build.gradle")) {
      config.modResults.contents += '\napply from: "./eas-build.gradle"';
    }
    return config;
  });
};

export default withAndroidSigning;
