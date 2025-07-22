export interface EnvironmentVariables {
  readonly NODE_ENV: string;
}

const DEFAULT_ENV_VARIABLES: EnvironmentVariables = {
  NODE_ENV: "development",
};

const variables: Partial<EnvironmentVariables> = {
  NODE_ENV: process.env.NODE_ENV,
};

const ENV: EnvironmentVariables = {
  NODE_ENV: variables.NODE_ENV ?? DEFAULT_ENV_VARIABLES.NODE_ENV,
};

export default ENV;
