//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_window_service', {
    valid: [
        '$window.location.href = ""',
        '$window.alert("")',
        'window.setInterval(function(){}, 0)',
        'window.setTimeout(function(){}, 0)',
        'window.document',
        'window.document.title'
    ],
    invalid: [
        { code: 'window.alert("")', errors: [{ message: 'You should use the $window service instead of the default window object'}] },
        { code: 'window.location.href = ""', errors: [{ message: 'You should use the $window service instead of the default window object'}] }
    ]
});
