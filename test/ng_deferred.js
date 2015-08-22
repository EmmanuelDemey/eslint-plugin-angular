//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_deferred'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_deferred', rule, {
    valid: [
        '$q(function(){});'
    ],
    invalid: [
        { code: 'var deferred = $q.defer();', errors: [{ message: 'You should not create a new promise with this syntax. Use the $q(function(resolve, reject){}) syntax.'}] }
    ]
});
