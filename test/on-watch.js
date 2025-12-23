'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/on-watch');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();

eslintTester.run('on-watch', rule, {
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
        '$scope.$watch()',

        // false positive check
        '$on()',
        'function watchSomething() {return $rootScope.$watch()}',
        'var variable = [$rootScope.$on(), $rootScope.$watch()]',
        'var variable = []; variable.push($rootScope.$watch());',

        // uncovered edgecase
        '$scope["$on"]()'

    ].concat(commonFalsePositives),
    invalid: [
        {code: '$rootScope.$on()', errors: [{message: 'The deregistration function returned by "$on" call should not be ignored'}]},
        {code: '$rootScope.$watch()', errors: [{message: 'The deregistration function returned by "$watch" call should not be ignored'}]}
    ]
});
