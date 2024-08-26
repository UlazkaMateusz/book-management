let path = require("path");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react", "no-relative-import-paths"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname)],
      },
    },
  },
};
