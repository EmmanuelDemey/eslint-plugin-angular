//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_no_cookiestore'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_no_cookiestore', rule, {
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
