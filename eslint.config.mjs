// @ts-check

import cspellESLintPluginRecommended from "@cspell/eslint-plugin/recommended";
import preferAlias from "@dword-design/eslint-plugin-import-alias";
import eslint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin  from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    perfectionist.configs["recommended-natural"],
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    cspellESLintPluginRecommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        name: "ESLint Config - nextjs",
        plugins: {
            "@next/next": pluginNext
        },
        // @ts-expect-error - nextjs typing is incorrect, but rules are correct.
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs["core-web-vitals"].rules
        }
    },
    {
        plugins: {
            "unused-imports": unusedImports
        }
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ]
        }
    },
    {
        ignores: [
            "node_modules/",
            "dist/",
            "coverage"
        ],
        plugins: {
            "@dword-design/import-alias": preferAlias,
            "@stylistic": stylistic,
            "unused-imports": unusedImports
        },
        rules: {
            "@dword-design/import-alias/prefer-alias": ["error", {
                alias: {
                    "@api": "./pages/api",
                    "@app": "./pages/app",
                    "@collections": "./src/collections",
                    "@components": "./src/components",
                    "@errors": "./src/errors",
                    "@public": "./public",
                    "@services": "./src/services",
                    "@slices": "./src/slices",
                    "@src": "./src",
                    "@styles": "./styles",
                    "@utils": "./src/utils"
                }
            }],
            "@stylistic/arrow-spacing": ["error", { after: true, before: true }],
            "@stylistic/comma-dangle": ["error", "never"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"]
        }
    }
);
