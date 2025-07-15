import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: { paddingBottom: theme["space-xl"], paddingInline: theme["space-md"], gap: theme["space-lg"] },
  wrapper: { display: "flex", flexDirection: "row", width: "100%", gap: theme["space-2xs"], alignItems: "center" },
  slider: { flex: 1 },
  timer: { flex: 0, color: theme["font-primary-color"], fontSize: theme["font-size-sm"] },
  player: {
    padding: theme["space-md"],
    marginInline: "auto",
    borderRadius: "50%",
    elevation: 3,
    color: theme["secondary-color-text"],
    backgroundColor: theme["secondary-color"],
  },
});
