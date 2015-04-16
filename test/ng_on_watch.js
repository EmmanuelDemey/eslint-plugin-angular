//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_on_watch', {
    valid: [
        'var variable = scope.$on()',
        'var variable = scope.$watch()',
        'var variable = $scope.$on()',
        'var variable = $scope.$watch()',
        'var variable = $rootScope.$on()',
        'var variable = $rootScope.$watch()'
    ],
    invalid: [
        { code: 'scope.$on()', errors: [{ message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: 'scope.$watch()', errors: [{ message: 'The "$watch" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: '$scope.$on()', errors: [{ message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: '$scope.$watch()', errors: [{ message: 'The "$watch" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: '$rootScope.$on()', errors: [{ message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: '$rootScope.$watch()', errors: [{ message: 'The "$watch" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] }
    ]
});
