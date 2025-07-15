import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 24,
  },
  dialog: { backgroundColor: "white", borderRadius: 8, width: "100%", overflow: "hidden" },
  title: { fontSize: 18, fontWeight: "bold", padding: 16, color: "#000" },
  description: { fontSize: 14, paddingHorizontal: 16, paddingBottom: 16, color: "#666" },
  actions: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#eee" },
  action: { flex: 1, padding: 16, alignItems: "center", justifyContent: "center" },
  label: {},
});
