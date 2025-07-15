import { Dimensions, StyleSheet } from "react-native";

import theme from "@/styling";

const image = 0.75 * Dimensions.get("window").width;

export default StyleSheet.create({
  container: { position: "relative", flex: 1, padding: theme["space-sm"] },
  image: {
    width: image,
    height: image,
    margin: "auto",
    borderRadius: 0.5 * image,
    borderWidth: 2,
    borderColor: theme["tertiary-color"],
  },
  player: { position: "absolute", inset: 0, top: "auto" },
});
