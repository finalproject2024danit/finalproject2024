import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest, // Додайте глобальні змінні для Jest
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
        },
    },
];
