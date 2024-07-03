const stylistic = require("@stylistic/eslint-plugin");

const customized = stylistic.configs.customize({
    // the following options are the default values
    indent: 4,
    quotes: "double",
    semi: true,
    jsx: true,
    // ...
});

module.exports = {
    extends: [
        "next/core-web-vitals",
        "plugin:@dword-design/import-alias/recommended",
        "plugin:storybook/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "react",
        "@typescript-eslint",
        "unused-imports",
        "@stylistic",
    ],
    rules: {
        ...customized.rules,
        "unused-imports/no-unused-imports": "error",
        "@dword-design/import-alias/prefer-alias": [
            "error",
            {
                alias: {
                    "@components": "./src/components",
                    "@errors": "./src/errors",
                    "@features": "./src/features",
                    "@services": "./src/services",
                    "@slices": "./src/slices",
                    "@utils": "./src/utils",
                    "@api": "./pages/api",
                    "@styles": "./styles",
                    "@public": "./public",
                    "@app": "./pages/app",
                    "@src": "./src",
                    "@project": ".",
                },
            },
        ],
    },
};
