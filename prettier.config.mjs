/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  endOfLine: "auto",
  importOrder: [
    "^(react|react-native|react-redux)$",
    "^(expo/(.*)|expo-(.*))$",
    "^@(native)(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(typings)(.*)$",
    "^@/(store)(.*)$",
    "^@/(fixtures|referential|rules|repositories|services|utils|testing|env)(.*)$",
    "^@/(hooks)(.*)$",
    "^@/(components)(.*)$",
    "^@ui/(.*)$",
    "^@/(styling|assets)(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
