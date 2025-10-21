import { StyleSheet } from "react-native-unistyles";

export default StyleSheet.create((theme, { screen }) => {
  const image = 0.75 * screen.width;
  return {
    container: { position: "relative", flex: 1, padding: theme["space-sm"] },
    image: {
      display: { portrait: "flex", landscape: "none" },
      width: image,
      height: image,
      margin: "auto",
      borderRadius: 0.5 * image,
      borderWidth: 2,
      borderColor: theme["tertiary-color"],
    },
    player: { position: "absolute", inset: 0, top: "auto" },
  };
});
