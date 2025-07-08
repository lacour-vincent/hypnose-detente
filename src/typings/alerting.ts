export interface Alert {
  id: string;
  level: AlertLevel;
  message: string;
}

export enum AlertLevel {
  SUCCESS = "success",
  ERROR = "error",
}
