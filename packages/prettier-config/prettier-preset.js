// eslint-disable-next-line no-undef
module.exports = {
  semi: true,
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: "auto",
  trailingComma: "es5",
  arrowParens: "always",

  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["config/env", "<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSeparation: true,
};
