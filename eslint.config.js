const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    rules: {
      'no-prototype-builtins': 0,
      'no-useless-escape': 0
    }
  },
  {
    ignores: ['examples/']
  },
  {
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.node,
      },
    },
  },
];
