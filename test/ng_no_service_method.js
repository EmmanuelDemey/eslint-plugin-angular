//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var valid = [], invalid = [];
['factory', 'provider', 'constant', 'value'].forEach(function(syntax){
    valid.push({
        code: 'app.' + syntax + '("eslintService", function(){});',
        args: 2
    }, {
        code: 'app.' + syntax + '("eslintService", function(){});',
        args: 2
    }, {
        code: 'app.' + syntax + '("eslintService", function(){});',
        args: 2
    });
});


var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_service_method', {
    valid: valid,
    invalid: [{
        code: 'app.service("Service", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'You should prefer the factory() method instead of service()'}]
    }, {
        code: 'app.service("Service", [function(){}]);',
        args: [1, /^eslint/],
        errors: [{ message: 'You should prefer the factory() method instead of service()'}]
    }]
});
