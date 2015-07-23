//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_deferred', {
    valid: [
        '$qs(function(){});'
    ],
    invalid: [
        { code: 'var deferred = $q.deferred;', errors: [{ message: 'You should not create a new promise with this syntax. Use the $q(function(resolve, reject){}) syntax.'}] }
    ]
});
