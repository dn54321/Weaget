const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({
  // the following options are the default values
  indent: 2,
  quotes: 'single',
  semi: false,
  jsx: true,
  // ...
})

module.exports = {
  "extends": [
    "next/core-web-vitals",
    "plugin:@dword-design/import-alias/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
      "react",
      "@typescript-eslint",
      "unused-imports",
      "@stylistic/ts"
  ],
  "rules": {
      ...customized.rules,
      "unused-imports/no-unused-imports": "error"
  }
}
