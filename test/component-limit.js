//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/component-limit'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('component-limit', rule, {
    valid: [
        'app.controller("", function(){});',
        'app.directive("", function(){});',
        'app.factory("", function(){});',
        'app.filter("", function(){});',
        'app.provider("", function(){});',
        'app.service("", function(){});',
        {
            code: 'app.controller("", function(){}).directive("", function(){}).factory("", function(){}).filter("", function(){}).provider("", function(){}).service("", function(){});',
            options: [6]
        }
    ],
    invalid: [{
        code: 'app.controller("", function(){}).directive("", function(){});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file'
        }, {
            message: 'There may be at most 1 AngularJS component per file'
        }]
    }, {
        code: 'app.factory("", function(){}).filter("", function(){});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file'
        }, {
            message: 'There may be at most 1 AngularJS component per file'
        }]
    }, {
        code: 'app.provider("", function(){}).service("", function(){});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file'
        }, {
            message: 'There may be at most 1 AngularJS component per file'
        }],
    }, {
        code: 'app.controller("", function(){}).directive("", function(){}).factory("", function(){}).filter("", function(){}).provider("", function(){}).service("", function(){});',
        options: [5],
        errors: [{
            message: 'There may be at most 5 AngularJS components per file'
        }, {
            message: 'There may be at most 5 AngularJS components per file'
        }, {
            message: 'There may be at most 5 AngularJS components per file'
        }, {
            message: 'There may be at most 5 AngularJS components per file'
        }, {
            message: 'There may be at most 5 AngularJS components per file'
        }, {
            message: 'There may be at most 5 AngularJS components per file'
        }]
    }]
});
