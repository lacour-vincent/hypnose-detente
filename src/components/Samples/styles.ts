import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  container: { rowGap: theme["space-xs"], padding: theme["space-xs"] },
  wrapper: { columnGap: theme["space-xs"] },
  link: { flex: 1, maxWidth: "50%" },
  item: { elevation: 3 },
}));
