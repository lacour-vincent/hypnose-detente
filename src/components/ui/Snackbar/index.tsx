import React, { type FC } from "react";

// eslint-disable-next-line no-restricted-imports
import { Snackbar as SnackbarUI } from "react-native-paper";

// eslint-disable-next-line no-restricted-imports
import type { ThemeProp } from "react-native-paper/lib/typescript/types";

import theme from "@/styling";

const AUTO_CLOSE_DURATION = 5000;

interface Props {
  variant?: "primary" | "secondary";
  message: string;
  onClose: () => void;
}

const THEME_FROM_VARIANT: Record<"primary" | "secondary", ThemeProp> = {
  primary: { colors: { inverseSurface: theme["success-color"], inverseOnSurface: theme["success-color-text"] } },
  secondary: { colors: { inverseSurface: theme["error-color"], inverseOnSurface: theme["error-color-text"] } },
};

const Snackbar: FC<Props> = ({ variant = "primary", message, onClose }) => {
  return (
    <SnackbarUI
      theme={THEME_FROM_VARIANT[variant]}
      duration={AUTO_CLOSE_DURATION}
      iconAccessibilityLabel="fermer"
      onDismiss={onClose}
      onIconPress={onClose}
      visible
    >
      {message}
    </SnackbarUI>
  );
};

export default Snackbar;
