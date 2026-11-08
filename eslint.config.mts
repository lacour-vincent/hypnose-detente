import react from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import jest from "eslint-plugin-jest";
import { type Config, defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const config: Config[] = defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, react.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "no-duplicate-imports": "error",
      "no-console": ["warn", { allow: ["info", "error"] }],
      "@eslint-react/exhaustive-deps": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["*.png", "!@/assets/**/*.png"], message: "Please import assets from @/assets instead." },
            { group: ["@testing-library/*"], message: "Please import from @/testing/react-native instead." },
            { group: ["@/components/ui/*"], message: "Please import from @ui/* instead." },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    extends: [jest.configs["flat/recommended"]],
    rules: {},
  },
]);

export default config;
