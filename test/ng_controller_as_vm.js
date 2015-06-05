//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_controller_as_vm', {
    valid: [
        { code: 'angular.module("test").controller("Test", function () { var vm = this; vm.test = "test"; } )',
            args: [2, 'vm']},
        { code: 'angular.module("test").controller("Test", function () { var vm = this; vm.test(); } )',
            args: [2, 'vm']},
        { code: 'angular.module("test").service("Test", function () { this.doSomething(); } )',
            args: [2, 'vm']}
    ],
    invalid: [
        { code: 'function controllerFunc() { this.test = "test"; } angular.module("test").controller("Test", controllerFunc )',
            args: [2, 'vm'],
            errors: [{ message: 'You should not use "this" directly. Instead, assign it to a variable called "vm"'}] },
        { code: 'angular.module("test").controller("Test", function () { this.test(); } )',
            args: [2, 'vm'],
            errors: [{ message: 'You should not use "this" directly. Instead, assign it to a variable called "vm"'}] },
        { code: 'var myController = function () { var ctrl = this; ctrl.test(); }; angular.module("test").controller("Test", myController )',
            args: [2, 'vm'],
            errors: [{ message: 'You should assign "this" to a consistent variable across your project: vm'}] },
        { code: 'function MyController () { var ctrl = this; ctrl.test(); }',
            args: [2, 'vm', '/[A-Z].*Controller/'],
            errors: [{ message: 'You should assign "this" to a consistent variable across your project: vm'}] }
    ]
});
