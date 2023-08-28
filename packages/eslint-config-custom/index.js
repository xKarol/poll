/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "turbo",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
