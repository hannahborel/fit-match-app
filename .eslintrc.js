module.exports = {
  root: true,
  env: {
    commonjs: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "off",
    "react-native/sort-styles": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
