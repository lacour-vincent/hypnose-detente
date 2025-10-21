import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: { rowGap: theme["space-xs"], padding: theme["space-xs"] },
  wrapper: { columnGap: theme["space-xs"], justifyContent: "center" },
  link: { flex: 1, maxWidth: { portrait: "50%", landscape: "25%" } },
  item: { elevation: 3 },
}));
