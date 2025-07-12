import type { StyleProp } from "react-native";

// eslint-disable-next-line no-restricted-imports
import { MD3LightTheme } from "react-native-paper";

// eslint-disable-next-line no-restricted-imports
import type { MD3Colors, ThemeProp } from "react-native-paper/lib/typescript/types";

const theme = {
  "font-primary-color": "rgba(0, 0, 0, 0.87)" as string,
  "font-secondary-color": "rgba(0, 0, 0, 0.60)" as string,
  "font-tertiary-color": "rgba(0, 0, 0, 0.38)" as string,

  "primary-color": "#008577" as string,
  "primary-color-text": "#FFFFFF" as string,
  "primary-color-dark": "#00574B" as string,

  "success-color": "#4CAF50" as string,
  "success-color-text": "#FFFFFF" as string,
  "error-color": "#F44336" as string,
  "error-color-text": "#FFFFFF" as string,

  background: "#FFFBFE" as string,
  outline: "#79747E" as string,

  "font-size-4xl": 36,
  "font-size-3xl": 30,
  "font-size-2xl": 24,
  "font-size-xl": 20,
  "font-size-lg": 18,
  "font-size-md": 16,
  "font-size-sm": 14,
  "font-size-xs": 12,

  "font-weight-light": 300,
  "font-weight-regular": 400,
  "font-weight-medium": 500,
  "font-weight-bold": 700,

  "space-xl": 52,
  "space-lg": 32,
  "space-md": 20,
  "space-sm": 12,
  "space-xs": 8,
  "space-2xs": 4,
} as const;

export const paper: ThemeProp = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    primary: theme["primary-color"],
    onPrimary: theme["primary-color-text"],
  } as MD3Colors,
};

type Style<T> = StyleProp<T>;

export const cn = <T>(styles: Style<T>[], modifiers?: Array<[Style<T>, boolean | undefined]>): Style<T>[] => {
  const base = styles.map((s) => s);
  if (!modifiers) return base;
  const more = modifiers.reduce<Style<T>[]>((acc, [style, apply]) => {
    if (apply) acc.push(style);
    return acc;
  }, []);
  return base.concat(more);
};

export default theme;
