import { type ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Hypnose Détente",
  slug: "hypnose-detente",
  owner: "lacour-vincent",
  version: "2.0.0-SNAPSHOT",
  orientation: "portrait",
  platforms: ["android"],
  android: {
    package: "com.lacour.vincent.hypnosedetente",
    versionCode: 37,
    adaptiveIcon: { foregroundImage: "./src/assets/icons/android-icon.png", backgroundColor: "#ffffff" },
    edgeToEdgeEnabled: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      { android: { compileSdkVersion: 35, targetSdkVersion: 35, buildToolsVersion: "35.0.0" } },
    ],
    [
      "expo-font",
      {
        android: {
          fonts: [
            {
              fontFamily: "Roboto",
              fontDefinitions: [
                { path: "./src/assets/fonts/Roboto_300.ttf", weight: 300 },
                { path: "./src/assets/fonts/Roboto_400.ttf", weight: 400 },
                { path: "./src/assets/fonts/Roboto_500.ttf", weight: 500 },
                { path: "./src/assets/fonts/Roboto_700.ttf", weight: 700 },
              ],
            },
          ],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/icons/splash-screen-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
};

export default config;
