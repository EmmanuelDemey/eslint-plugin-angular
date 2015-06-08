//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

var angularObjectList = ['controller', 'filter', 'directive'];
var defaultBadService = ['$http', '$resource', 'Restangular', '$q'];
var mapAngularObjectToBarServices = {
    controller: defaultBadService,
    filter: defaultBadService,
    directive: defaultBadService
};
var valid = [], invalid = [];

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        args: [1, defaultBadService]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, defaultBadService]
    }, {
        code: '"use strict";app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, defaultBadService]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            args: [1, defaultBadService],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            args: [1, defaultBadService],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        args: [1, defaultBadService, [object]]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, defaultBadService, [object]]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            args: [1, defaultBadService, [object]],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            args: [1, defaultBadService, [object]],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        args: [1, mapAngularObjectToBarServices]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, mapAngularObjectToBarServices]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            args: [1, mapAngularObjectToBarServices],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            args: [1, mapAngularObjectToBarServices],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_services', {
    valid: valid,
    invalid: invalid
});
