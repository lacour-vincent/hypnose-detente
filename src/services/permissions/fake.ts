import type { PermissionsService } from "@/services/permissions";

const check: PermissionsService["check"] = () => {
  return Promise.resolve(true);
};

const request: PermissionsService["request"] = () => {
  return Promise.resolve(true);
};

const service: PermissionsService = { check, request };

export default service;
