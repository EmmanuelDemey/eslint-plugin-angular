//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_no_service_method'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();

var valid = [], invalid = [];
['factory', 'provider', 'constant', 'value'].forEach(function(syntax){
    valid.push({
        code: 'app.' + syntax + '("eslintService", function(){});',
    }, {
        code: 'app.' + syntax + '("eslintService", function(){});',
    }, {
        code: 'app.' + syntax + '("eslintService", function(){});',
    });
});


var eslintTester = new ESLintTester(eslint);
eslintTester.run('ng_no_service_method', rule, {
    valid: valid,
    invalid: [{
        code: 'app.service("Service", function(){});',
        options: ['eslint'],
        errors: [{ message: 'You should prefer the factory() method instead of service()'}]
    }, {
        code: 'app.service("Service", [function(){}]);',
        options: [/^eslint/],
        errors: [{ message: 'You should prefer the factory() method instead of service()'}]
    }]
});
