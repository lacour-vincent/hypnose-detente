import type { Permission } from "react-native";

import fake from "./fake";
import impl from "./impl";

export interface PermissionsService {
  check: (permission: Permission) => Promise<boolean>;
  request: (permission: Permission) => Promise<boolean>;
}

export default { impl, fake };
