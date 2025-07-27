import { PermissionsAndroid } from "react-native";

import type { PermissionsService } from "@/services/permissions";

const check: PermissionsService["check"] = async (permission) => {
  const granted = await PermissionsAndroid.check(permission);
  return granted;
};

const request: PermissionsService["request"] = async (permission) => {
  const granted = await PermissionsAndroid.request(permission);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const service: PermissionsService = { check, request };

export default service;
