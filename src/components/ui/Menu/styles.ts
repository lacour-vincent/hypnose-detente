import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme) => ({
  overlay: { flex: 1, backgroundColor: "transparent" },
  menu: { position: "absolute", elevation: 4, borderRadius: 4, backgroundColor: "#ffffff" },
  item: { padding: theme["space-md"] },
  label: { fontSize: theme["font-size-md"] },
}));
