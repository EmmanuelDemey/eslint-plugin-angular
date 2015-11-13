'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/on');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();

eslintTester.run('on', rule, {
    valid: [
        'var variable = scope.$on()',
        'var variable = $scope.$on()',
        '$scope.$on("$destroy")',
        '$scope.$on("$destroy", $scope.$on())',
        '$scope.$on("$destroy", $rootScope.$on())',

        // false positive check
        '$on()'

    ],
    invalid: [
        {code: '$scope.$on()', errors: [{message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}]},
        {code: 'scope.$on()', errors: [{message: 'The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event'}]}
    ]
});
