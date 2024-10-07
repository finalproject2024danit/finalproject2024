import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Вимкніть вимогу імпорту React
      "react/jsx-no-target-blank": [
        "error",
        {
          allowReferrer: false,
        },
      ], // Налаштування для target="_blank"
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Автоматичне визначення версії React
      },
    },
  },
];
