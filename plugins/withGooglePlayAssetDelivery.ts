import {
  type ConfigPlugin,
  withAppBuildGradle,
  withBaseMod,
  withPlugins,
  withSettingsGradle,
} from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

interface AssetPack {
  name: string;
  path: string;
}

const withGooglePlayAssetDelivery: ConfigPlugin<AssetPack[]> = (config, packs: AssetPack[] = []) => {
  return withPlugins(config, [
    [withPlayAssetDeliveryAppBuildGradle, packs],
    [withPlayAssetDeliverySettingsGradle, packs],
    [withPlayAssetDeliveryFiles, packs],
  ]);
};

const withPlayAssetDeliveryAppBuildGradle: ConfigPlugin<AssetPack[]> = (config, packs) => {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = addAssetPacksToAppBuildGradle(config.modResults.contents, packs);
    return config;
  });
};

const addAssetPacksToAppBuildGradle = (buildGradle: string, packs: AssetPack[]) => {
  return buildGradle.replace(
    /android\s?{/,
    `android {
    assetPacks = ${JSON.stringify(packs.map((pack) => ":" + pack.name))}`,
  );
};

const withPlayAssetDeliverySettingsGradle: ConfigPlugin<AssetPack[]> = (config, packs) => {
  return withSettingsGradle(config, (config) => {
    config.modResults.contents = addAssetPacksToSettingsGradle(config.modResults.contents, packs);
    return config;
  });
};

const addAssetPacksToSettingsGradle = (settingsGradle: string, packs: AssetPack[]) => {
  return settingsGradle + "\n" + packs.map((pack) => `include ':${pack.name}'`).join("\n");
};

const withPlayAssetDeliveryFiles: ConfigPlugin<AssetPack[]> = (config, packs) => {
  return withBaseMod(config, {
    platform: "android",
    mod: "assetPackLink",
    isProvider: true,
    action: (config) => {
      const androidRoot = config.modRequest.platformProjectRoot;
      for (const pack of packs) {
        const assetPackRoot = `${androidRoot}/${pack.name}`;
        const assetPackSrcMain = `${assetPackRoot}/src/main/`;
        if (!fs.existsSync(assetPackSrcMain)) {
          fs.mkdirSync(assetPackSrcMain, { recursive: true });
        }
        const assetPackBuildGradle = `${assetPackRoot}/build.gradle`;
        if (!fs.existsSync(assetPackBuildGradle)) {
          fs.writeFileSync(assetPackBuildGradle, getAssetPackBuildGradle(pack));
        }
        const assetPackLinkTarget = `${assetPackSrcMain}/assets`;
        if (!fs.existsSync(assetPackLinkTarget)) {
          fs.symlinkSync(path.resolve(config.modRequest.projectRoot, pack.path), assetPackLinkTarget, "dir");
        }
      }
      return config;
    },
  });
};

const getAssetPackBuildGradle = (assetPack: AssetPack) => {
  return `plugins {
    id 'com.android.asset-pack'
}

assetPack {
    packName = "${assetPack.name}"
    dynamicDelivery {
        deliveryType = "on-demand"
    }
}\n`;
};

export default withGooglePlayAssetDelivery;
