export interface EnvironmentVariables {
  readonly NODE_ENV: string;
  readonly EXPO_PUBLIC_PLAY_STORE_URL: string;
  readonly EXPO_PUBLIC_WEBSITE_URL: string;
  readonly EXPO_PUBLIC_REPORT_URL: string;
}

const DEFAULT_ENV_VARIABLES: EnvironmentVariables = {
  NODE_ENV: "development",
  EXPO_PUBLIC_PLAY_STORE_URL: "market://details?id=com.lacour.vincent.hypnosedetente",
  EXPO_PUBLIC_WEBSITE_URL: "https://free-hypnosis-mp3.com",
  EXPO_PUBLIC_REPORT_URL:
    "mailto:lacour.vincent.app@gmail.com?subject=Application%20Hypnose-D%C3%A9tente%20-%20signalement",
};

const variables: Partial<EnvironmentVariables> = {
  NODE_ENV: process.env.NODE_ENV,
  EXPO_PUBLIC_PLAY_STORE_URL: process.env.EXPO_PUBLIC_PLAY_STORE_URL,
  EXPO_PUBLIC_WEBSITE_URL: process.env.EXPO_PUBLIC_WEBSITE_URL,
  EXPO_PUBLIC_REPORT_URL: process.env.EXPO_PUBLIC_REPORT_URL,
};

const ENV: EnvironmentVariables = {
  NODE_ENV: variables.NODE_ENV ?? DEFAULT_ENV_VARIABLES.NODE_ENV,
  EXPO_PUBLIC_PLAY_STORE_URL: variables.EXPO_PUBLIC_PLAY_STORE_URL ?? DEFAULT_ENV_VARIABLES.EXPO_PUBLIC_PLAY_STORE_URL,
  EXPO_PUBLIC_WEBSITE_URL: variables.EXPO_PUBLIC_WEBSITE_URL ?? DEFAULT_ENV_VARIABLES.EXPO_PUBLIC_WEBSITE_URL,
  EXPO_PUBLIC_REPORT_URL: variables.EXPO_PUBLIC_REPORT_URL ?? DEFAULT_ENV_VARIABLES.EXPO_PUBLIC_REPORT_URL,
};

export default ENV;
