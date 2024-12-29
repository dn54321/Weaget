// @ts-check

import eslint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import preferAlias from "@dword-design/eslint-plugin-import-alias";
import sortImportRequires from "eslint-plugin-sort-imports-requires";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    stylistic.configs["recommended-flat"],
    {
        name: "ESLint Config - nextjs",
        plugins: {
            "@next/next": pluginNext,
        },
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        // @ts-expect-error - nextjs typing is incorrect, but rules are correct.
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs["core-web-vitals"].rules,
        },
    },
    {
        ignores: [
            "node_modules/",
            "dist/",
            "coverage",
        ],
        plugins: {
            "@dword-design/import-alias": preferAlias,
            "@stylistic": stylistic,
            "unused-imports": unusedImports,
            "sort-imports-requires": sortImportRequires,
        },
        rules: {
            "@dword-design/import-alias/prefer-alias": ["error", {
                alias: {
                    "@api": "./pages/api",
                    "@app": "./pages/app",
                    "@components": "./src/components",
                    "@errors": "./src/errors",
                    "@features": "./src/features",
                    "@project": ".",
                    "@public": "./public",
                    "@services": "./src/services",
                    "@slices": "./src/slices",
                    "@src": "./src",
                    "@styles": "./styles",
                    "@utils": "./src/utils",
                },
            }],
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/arrow-parens": ["error", "as-needed", {
                requireForBlockBody: true,
            }],
            "@stylistic/arrow-spacing": ["error", {
                after: true,
                before: true,
            }],
            "@stylistic/block-spacing": ["error", "always"],
            "@stylistic/brace-style": ["error", "stroustrup", {
                allowSingleLine: true,
            }],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/comma-spacing": ["error", {
                after: true,
                before: false,
            }],
            "@stylistic/comma-style": ["error", "last"],
            "@stylistic/computed-property-spacing": ["error", "never", {
                enforceForClassMembers: true,
            }],
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/eol-last": "error",
            "@stylistic/indent": ["error", 4, {
                ArrayExpression: 1,

                CallExpression: {
                    arguments: 1,
                },

                FunctionDeclaration: {
                    body: 1,
                    parameters: 1,
                },

                FunctionExpression: {
                    body: 1,
                    parameters: 1,
                },

                ImportDeclaration: 1,

                MemberExpression: 1,

                ObjectExpression: 1,

                SwitchCase: 1,
                VariableDeclarator: 1,
                flatTernaryExpressions: false,
                ignoreComments: false,
                ignoredNodes: [
                    "TSUnionType",
                    "TSIntersectionType",
                    "TSTypeParameterInstantiation",
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                ],
                offsetTernaryExpressions: true,
                outerIIFEBody: 1,
                tabLength: 4,
            }],
            "@stylistic/indent-binary-ops": ["error", 4],
            "@stylistic/jsx-closing-bracket-location": "error",
            "@stylistic/jsx-closing-tag-location": "error",
            "@stylistic/jsx-curly-brace-presence": ["error", {
                propElementValues: "always",
            }],
            "@stylistic/jsx-curly-newline": "error",
            "@stylistic/jsx-curly-spacing": ["error", "never"],
            "@stylistic/jsx-equals-spacing": "error",
            "@stylistic/jsx-first-prop-new-line": "error",
            "@stylistic/jsx-function-call-newline": ["error", "multiline"],
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/jsx-max-props-per-line": ["error", {
                maximum: 1,
                when: "multiline",
            }],
            "@stylistic/jsx-one-expression-per-line": ["error", {
                allow: "single-child",
            }],
            "@stylistic/jsx-quotes": "error",
            "@stylistic/jsx-tag-spacing": ["error", {
                afterOpening: "never",
                beforeClosing: "never",
                beforeSelfClosing: "always",
                closingSlash: "never",
            }],
            "@stylistic/jsx-wrap-multilines": ["error", {
                arrow: "parens-new-line",
                assignment: "parens-new-line",
                condition: "parens-new-line",
                declaration: "parens-new-line",
                logical: "parens-new-line",
                prop: "parens-new-line",
                propertyValue: "parens-new-line",
                return: "parens-new-line",
            }],
            "@stylistic/key-spacing": ["error", {
                afterColon: true,
                beforeColon: false,
            }],
            "@stylistic/keyword-spacing": ["error", {
                after: true,
                before: true,
            }],
            "@stylistic/lines-between-class-members": ["error", "always", {
                exceptAfterSingleLine: true,
            }],
            "@stylistic/max-statements-per-line": ["error", {
                max: 1,
            }],
            "@stylistic/member-delimiter-style": ["error", {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },

                multilineDetection: "brackets",

                overrides: {
                    interface: {
                        multiline: {
                            delimiter: "semi",
                            requireLast: true,
                        },
                    },
                },

                singleline: {
                    delimiter: "semi",
                },
            }],
            "@stylistic/multiline-ternary": ["error", "always-multiline"],
            "@stylistic/new-parens": "error",
            "@stylistic/no-extra-parens": ["error", "functions"],
            "@stylistic/no-floating-decimal": "error",
            "@stylistic/no-mixed-operators": ["error", {
                allowSamePrecedence: true,

                groups: [
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"],
                ],
            }],
            "@stylistic/no-mixed-spaces-and-tabs": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-multiple-empty-lines": ["error", {
                max: 1,
                maxBOF: 0,
                maxEOF: 0,
            }],
            "@stylistic/no-tabs": "error",
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/operator-linebreak": ["error", "before"],
            "@stylistic/padded-blocks": ["error", {
                blocks: "never",
                classes: "never",
                switches: "never",
            }],
            "@stylistic/quote-props": ["error", "consistent-as-needed"],
            "@stylistic/quotes": ["error", "double", {
                allowTemplateLiterals: true,
                avoidEscape: false,
            }],
            "@stylistic/rest-spread-spacing": ["error", "never"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/semi-spacing": ["error", {
                after: true,
                before: false,
            }],
            "@stylistic/space-before-blocks": ["error", "always"],
            "@stylistic/space-before-function-paren": ["error", {
                anonymous: "always",
                asyncArrow: "always",
                named: "never",
            }],
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/space-unary-ops": ["error", {
                nonwords: false,
                words: true,
            }],
            "@stylistic/spaced-comment": ["error", "always", {
                block: {
                    balanced: true,
                    exceptions: ["*"],
                    markers: ["!"],
                },

                line: {
                    exceptions: ["/", "#"],
                    markers: ["/"],
                },
            }],
            "@stylistic/template-curly-spacing": "error",
            "@stylistic/template-tag-spacing": ["error", "never"],
            "@stylistic/type-annotation-spacing": ["error", {}],
            "@stylistic/type-generic-spacing": "error",
            "@stylistic/type-named-tuple-spacing": "error",
            "@stylistic/wrap-iife": ["error", "any", {
                functionPrototypeMethods: true,
            }],
            "@stylistic/yield-star-spacing": ["error", "both"],
            // "sort-keys/sort-keys-fix": "error",
            "sort-imports-requires/sort-imports": ["error", { unsafeAutofix: true }],
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
);
