//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_cookiestore', {
    valid: [
        '$cookies();'
    ],
    invalid: [{
        code: '$cookieStore.get("");',
        errors: [{ message: 'Since Angular 1.4, the $cookieStore service is depreacted. Please use now the $cookies service.'}]
    }, {
        code: '$cookieStore.put("", "");',
        errors: [{ message: 'Since Angular 1.4, the $cookieStore service is depreacted. Please use now the $cookies service.'}]
    }
    ]
});
