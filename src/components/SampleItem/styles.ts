import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: { borderRadius: 4, backgroundColor: theme.background },
  thumbnail: { aspectRatio: 1, borderTopStartRadius: 4, borderTopEndRadius: 4 },
  wrapper: { position: "relative", gap: theme["space-2xs"], padding: theme["space-xs"] },
  title: { color: theme["font-primary-color"], fontSize: theme["font-size-sm"], lineHeight: theme["font-size-sm"] },
  row: { display: "flex", flexDirection: "row", alignItems: "center", gap: theme["space-2xs"] },
  duration: {
    color: theme["font-secondary-color"],
    fontSize: theme["font-size-sm"],
    lineHeight: theme["font-size-sm"],
  },
  offline: { marginStart: "auto" },
});
