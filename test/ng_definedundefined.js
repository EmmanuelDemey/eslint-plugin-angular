//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_definedundefined', {
    valid: [
        'angular.isUndefined(toto)',
        'angular.isDefined(toto)'
    ],
    invalid: [
        { code: 'variable === undefined', errors: [{ message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}] },
        { code: 'undefined === variable', errors: [{ message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}] },
        { code: 'undefined !== variable', errors: [{ message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}] },
        { code: 'variable !== undefined', errors: [{ message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}] },
        { code: '!angular.isUndefined(variable)', errors: [{ message: 'Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method'}] },
        { code: '!angular.isDefined(variable)', errors: [{ message: 'Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method'}] }
    ]
});
