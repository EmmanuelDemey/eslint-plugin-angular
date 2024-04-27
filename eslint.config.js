const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        rules: {
            'indent': [2, 4, { SwitchCase: 1 }],
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
