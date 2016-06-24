'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/on-destroy');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();

eslintTester.run('on-destroy', rule, {
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
        'scope.$on("$destroy")',
        '$rootScope.$on("$destroy")',

        // false positive check
        '$on()',

        // uncovered edgecase
        '$scope["$on"]()'
    ].concat(commonFalsePositives),
    invalid: [
        {code: '$rootScope.$on("destroy")', errors: [{message: 'You probably misspelled $on("$destroy").'}]},
        {code: 'scope.$on("destroy")', errors: [{message: 'You probably misspelled $on("$destroy").'}]}
    ]
});
