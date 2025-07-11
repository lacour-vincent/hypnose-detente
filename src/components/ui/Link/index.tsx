import React, { type FC, type ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";

import { type LinkProps, Link as LinkUI } from "expo-router";

import { cn } from "@/styling";

interface Props extends LinkProps {
  style?: StyleProp<TextStyle>;
  href: string;
  label?: string;
  children: ReactNode;
}

const Link: FC<Props> = ({ style, href, label, children }) => {
  return (
    <LinkUI style={cn([style])} href={href} aria-label={label} accessibilityLabel={label}>
      {children}
    </LinkUI>
  );
};

export default Link;
