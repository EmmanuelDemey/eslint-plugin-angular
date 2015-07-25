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
        'var variable = $rootScope.$watch()',
        '$scope.$on("$destroy")',
        '$rootScope.$on("$destroy")',
        '$scope.$on("$destroy", $scope.$on())',
        '$rootScope.$on("$destroy", $scope.$on())',
        '$scope.$on("$destroy", $rootScope.$on())',
        '$rootScope.$on("$destroy", $rootScope.$on())',
        'scope.$on()',
        'scope.$watch()',
        '$scope.$on()',
        '$scope.$watch()'

    ],
    invalid: [
        { code: '$rootScope.$on()', errors: [{ message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] },
        { code: '$rootScope.$watch()', errors: [{ message: 'The "$watch" call should be assigned to a variable, in order to be destroyed during the $destroy event'}] }
    ]
});
