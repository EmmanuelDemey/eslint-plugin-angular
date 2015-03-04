//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var valid = [], invalid = [];
['service', 'factory', 'provider', 'constant', 'value'].forEach(function(syntax){
    valid.push({
        code: 'angular.' + syntax + '("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.' + syntax + '("eslintDirective", function(){});',
        args: [1, /^eslint/]
    });

    invalid.push({
        code: 'angular.' + syntax + '("Service", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The Service service should be prefixed by eslint'}]
    }, {
        code: 'angular.' + syntax + '("esLintService", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
    }, {
        code: 'angular.' + syntax + '("Service", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The Service service should follow this pattern: /^eslint/'}]
    }, 
    {
        code: 'angular.' + syntax + '("$Service", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The $Service service should not start with "$". This is reserved for AngularJS services'}]
    });
});


var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_service_name', {
    valid: valid,
    invalid: invalid
});
