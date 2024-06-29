const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({
  // the following options are the default values
  indent: 4,
  quotes: 'double',
  semi: true,
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
      "@stylistic"
  ],
  "rules": {
      ...customized.rules,
      "unused-imports/no-unused-imports": "error"
  }
}
