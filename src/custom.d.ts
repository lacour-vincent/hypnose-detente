declare module "*.jpeg" {
  import type { ImageSourcePropType } from "react-native";
  const jpeg: ImageSourcePropType;
  export default jpeg;
}

declare module "*.png" {
  const png: ImageSourcePropType;
  export default png;
}

declare module "*.mp3" {
  const svg: string;
  export default svg;
}

// TODO: @react-native/normalize-colors does not ship type declarations.
// Remove once unistyles or the package itself provides them.
declare module "@react-native/normalize-colors";
