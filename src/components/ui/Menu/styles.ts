import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  overlay: { flex: 1, backgroundColor: "transparent" },
  menu: { position: "absolute", elevation: 4, borderRadius: 4, backgroundColor: theme.background },
  item: { padding: theme["space-md"] },
  label: { fontSize: theme["font-size-md"], color: theme["font-primary-color"] },
}));
