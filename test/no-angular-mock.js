'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-angular-mock');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-angular-mock', rule, {
    valid: [
        'dump();',
        'inject();',
        'module();',
        'module',
        'module.exports',
        'module.exports = {}',
        {
            code: 'dump()',
            options: ['webpack-module-support']
        }
    ].concat(commonFalsePositives),
    invalid: [{
        code: 'angular.mock.dump();',
        errors: [{message: 'You should use the "dump" method available in the window object.'}],
        output: 'dump();'
    }, {
        code: 'angular.mock.inject();',
        errors: [{message: 'You should use the "inject" method available in the window object.'}],
        output: 'inject();'
    }, {
        code: 'angular.mock.module();',
        errors: [{message: 'You should use the "module" method available in the window object.'}],
        output: 'module();'
    }, {
        code: 'beforeEach(angular.mock.module("exampleModule"))',
        errors: [{message: 'You should use the "module" method available in the window object.'}],
        output: 'beforeEach(module("exampleModule"))'
    }, {
        code: 'angular.mock.dump();',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "dump" method available in the window object.'}],
        output: 'dump();'
    }, {
        code: 'angular.mock.inject();',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "inject" method available in the window object.'}],
        output: 'inject();'
    }, {
        code: 'module();',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "angular.mock.module" method directly.'}],
        output: 'angular.mock.module();'
    }, {
        code: 'module("exampleModule");',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "angular.mock.module" method directly.'}],
        output: 'angular.mock.module("exampleModule");'
    }, {
        code: 'beforeEach(module("exampleModule"))',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "angular.mock.module" method directly.'}],
        output: 'beforeEach(angular.mock.module("exampleModule"))'
    }, {
        code: 'angular.mock.module("exampleModule"); module("anotherModule")',
        options: ['webpack-module-support'],
        errors: [{message: 'You should use the "angular.mock.module" method directly.'}],
        output: 'angular.mock.module("exampleModule"); angular.mock.module("anotherModule")'
    }
    ]
});
