import type { StyleProp } from "react-native";

// eslint-disable-next-line no-restricted-imports
import { MD3LightTheme } from "react-native-paper";

// eslint-disable-next-line no-restricted-imports
import type { MD3Colors, ThemeProp } from "react-native-paper/lib/typescript/types";

const theme = {
  "font-primary-color": "#1B1918" as string,
  "font-secondary-color": "#959595" as string,
  "font-tertiary-color": "#2E4057" as string,

  "primary-color": "#49A0A2" as string,
  "primary-color-text": "#FFFFFF" as string,
  "secondary-color": "#2E4057" as string,
  "secondary-color-text": "#FFFFFF" as string,
  "tertiary-color": "#007891" as string,
  "tertiary-color-text": "#FFFFFF" as string,
  "quaternary-color": "#A13845" as string,
  "quaternary-color-text": "#FFFFFF" as string,

  "success-color": "#49A0A2" as string,
  "success-color-text": "#FFFFFF" as string,
  "error-color": "#FF0202" as string,
  "error-color-text": "#FFFFFF" as string,
  "disabled-color": "#E0E0E0" as string,
  "disabled-color-text": "#A6A6A6" as string,
  "validated-color": "#C5F4DD" as string,
  "validated-color-text": "#096034" as string,
  "pending-color": "#FFDE84" as string,
  "pending-color-text": "#FFDE84" as string,
  "failed-color": "#FECFCD" as string,
  "failed-color-text": "#650905" as string,
  "inactive-color": "#979797" as string,
  "inactive-color-text": "#FFFFFF" as string,
  "urgency-color": "#FF0000" as string,
  "urgency-color-text": "#FFFFFF" as string,

  "separator-color": "#E4E4E4" as string,
  "hover-color": "#979797" as string,
  "border-color": "#E4E4E4" as string,
  "background-color": "#FFFFFF" as string,
  "accent-color": "#49A0A2" as string,

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
    secondary: theme["secondary-color"],
    onSecondary: theme["secondary-color-text"],
    tertiary: theme["tertiary-color"],
    tertiaryContainer: theme["tertiary-color-text"],
    error: theme["error-color"],
    onError: theme["error-color-text"],
    outline: theme["accent-color"],
    surfaceDisabled: theme["disabled-color"],
    onSurfaceDisabled: theme["disabled-color-text"],
  } as MD3Colors,
};

type Style = StyleProp<unknown>;

export const cn = (styles: Style[], modifiers?: Array<[Style, boolean | undefined]>): Style[] => {
  const base = styles.map((s) => s);
  if (!modifiers) return base;
  const more = modifiers.reduce<Style[]>((acc, [style, apply]) => {
    if (apply) acc.push(style);
    return acc;
  }, []);
  return base.concat(more);
};

export default theme;
