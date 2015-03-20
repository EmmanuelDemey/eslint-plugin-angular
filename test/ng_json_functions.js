//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_json_functions', {
    valid: [
        'angular.toJson({})',
        'angular.toJson({}, true)',
        'angular.toJson({}, 2)',
        'angular.toJson([])',
        'angular.toJson([], true)',
        'angular.toJson([], 2)',
        'angular.fromJson("{}")'
    ],
    invalid: [
        { code: 'JSON.parse("{}")', errors: [{ message: 'You should use the fromJson method instead of JSON.parse'}] },
        { code: 'JSON.stringify({})', errors: [{ message: 'You should use the toJson method instead of JSON.stringify'}] },
        { code: 'JSON.stringify({}, function(){})', errors: [{ message: 'You should use the toJson method instead of JSON.stringify'}] },
        { code: 'JSON.stringify({}, function(){}, 2)', errors: [{ message: 'You should use the toJson method instead of JSON.stringify'}] }
    ]
});
