'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-run-logic');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-run-logic', rule, {
    valid: [
        'angular.module("").run();',
        'angular.module("").run(function() {});',
        'angular.module("").run(function() {foo()});',
        'angular.module("").run(function() {foo.bar()});',
        // valid arguments if params are allowed
        'angular.module("").run(function() {foo(0)});',
        'angular.module("").run(function() {foo(true)});',
        'angular.module("").run(function() {foo(null)});',
        'angular.module("").run(function() {foo(undefined)});',
        'angular.module("").run(function() {foo("bar")});',
        'angular.module("").run(function() {foo(bar)});',
        // don't crash on component definitions
        'angular.module("").animation();',
        'angular.module("").config();',
        'angular.module("").controller();',
        'angular.module("").directive();',
        'angular.module("").factory();',
        'angular.module("").filter();',
        'angular.module("").provider();',
        'angular.module("").run();',
        'angular.module("").service();'
    ],
    invalid: [
        // Nested function declarations
        {
            code: 'angular.module().run(function() {function foo() {}})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run([function() {function foo() {}}])',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {function foo() {}})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run(fn); function fn() {function foo() {}}',
            errors: [{message: 'The run function may only contain call expressions'}]
        },
        // Non call expression statements
        {
            code: 'angular.module().run(function() {foo = bar;})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run([function() {foo = bar;}])',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {foo = bar;})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run(fn); function fn() {foo = bar;}',
            errors: [{message: 'The run function may only contain call expressions'}]
        },
        // Nested member expressions
        {
            code: 'angular.module().run(function() {foo.bar.baz();})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run([function() {foo.bar.baz();}])',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {foo.bar.baz();})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run(fn); function fn() {foo.bar.baz();}',
            errors: [{message: 'The run function may only contain call expressions'}]
        },
        // Nested member expressions
        {
            code: 'angular.module().run(function() {foo().bar.baz();})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run([function() {foo().bar.baz();}])',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {foo().bar.baz();})',
            errors: [{message: 'The run function may only contain call expressions'}]
        }, {
            code: 'angular.module().run(fn); function fn() {foo().bar.baz();}',
            errors: [{message: 'The run function may only contain call expressions'}]
        },
        // Disallow any parameters
        {
            code: 'angular.module().run(function() {foo(1);})',
            options: [{allowParams: false}],
            errors: [{message: 'Run function call expressions may not take any arguments'}]
        }, {
            code: 'angular.module().run([function() {foo(1);}])',
            options: [{allowParams: false}],
            errors: [{message: 'Run function call expressions may not take any arguments'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {foo(1);})',
            options: [{allowParams: false}],
            errors: [{message: 'Run function call expressions may not take any arguments'}]
        }, {
            code: 'angular.module().run(fn); function fn() {foo(1);}',
            options: [{allowParams: false}],
            errors: [{message: 'Run function call expressions may not take any arguments'}]
        },
        // Allow simple parameters
        {
            code: 'angular.module().run(function() {foo(bar());})',
            errors: [{message: 'Run function call expressions may only take simple arguments'}]
        }, {
            code: 'angular.module().run([function() {foo(bar());}])',
            errors: [{message: 'Run function call expressions may only take simple arguments'}]
        }, {
            code: 'var app = angular.module(); app.run(function() {foo(bar());})',
            errors: [{message: 'Run function call expressions may only take simple arguments'}]
        }, {
            code: 'angular.module().run(fn); function fn() {foo(bar());}',
            errors: [{message: 'Run function call expressions may only take simple arguments'}]
        }
    ]
});
