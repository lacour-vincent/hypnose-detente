export interface AssetPack {
  name: string;
  file: string;
}

export interface AssetPackState {
  name: string;
  status: AssetPackStatus;
  errorCode?: AssetPackErrorCode;
}

export type AssetPackStates = Record<AssetPack["name"], AssetPackState>;

export enum AssetPackStatus {
  UNKNOWN = 0,
  PENDING = 1,
  DOWNLOADING = 2,
  TRANSFERRING = 3,
  COMPLETED = 4,
  FAILED = 5,
  CANCELED = 6,
  WAITING_FOR_WIFI = 7,
  NOT_INSTALLED = 8,
  REQUIRES_USER_CONFIRMATION = 9,
}

export enum AssetPackErrorCode {
  NO_ERROR = 0,
  APP_UNAVAILABLE = -1,
  PACK_UNAVAILABLE = -2,
  INVALID_REQUEST = -3,
  DOWNLOAD_NOT_FOUND = -4,
  API_NOT_AVAILABLE = -5,
  NETWORK_ERROR = -6,
  ACCESS_DENIED = -7,
  INSUFFICIENT_STORAGE = -10,
  APP_NOT_OWNED = -13,
  CONFIRMATION_NOT_REQUIRED = -14,
  UNRECOGNIZED_INSTALLATION = -15,
  INTERNAL_ERROR = -100,
}
