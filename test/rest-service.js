'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../rules/rest-service');
const RuleTester = require('eslint').RuleTester;
const commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const eslintTester = new RuleTester();

const angularObjectList = ['controller', 'filter', 'directive', 'service', 'factory', 'provider'];
const possibleValues = ['$http', '$resource', 'Restangular'];
let valid = [];
let invalid = [];

valid.push({
    code: 'angular.module("name").service("cmnHttpSvc", function($http) {});',
    options: ['cmnHttpSvc']
});
angularObjectList.forEach(function(object) {
    possibleValues.forEach(function(value) {
        valid.push({
            code: 'app.' + object + '("name", function(Service1) {});',
            options: [value]
        }, {
            code: 'app.' + object + '("name", ["Service1", function(Service1) {}]);',
            options: [value]
        }, {
            code: '"use strict";app.' + object + '("name", ["Service1", function(Service1) {}]);',
            options: [value]
        });
    });

    possibleValues.forEach(function(value) {
        possibleValues.filter(function(v) {
            return v !== value;
        }).forEach(function(badValue) {
            invalid.push({
                code: 'app.' + object + '("name", function(' + badValue + ') {});',
                options: [value],
                errors: [{message: 'You should use the same service (' + value + ') for REST API calls'}]
            }, {
                code: 'app.' + object + '("name", ["' + badValue + '", function(' + badValue + ') {}]);',
                options: [value],
                errors: [{message: 'You should use the same service (' + value + ') for REST API calls'}]
            });
        });
    });
});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

eslintTester.run('rest-service', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
