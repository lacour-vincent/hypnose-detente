import { StyleSheet } from "react-native";

import theme from "@/styling";

export default StyleSheet.create({
  container: { rowGap: theme["space-xs"], padding: theme["space-xs"] },
  wrapper: { columnGap: theme["space-xs"] },
  link: { flex: 1, maxWidth: "50%" },
  item: { elevation: 3 },
});
