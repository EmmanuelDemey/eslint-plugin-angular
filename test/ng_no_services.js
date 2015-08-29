//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_no_services'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();

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
        options: [defaultBadService]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        options: [defaultBadService]
    }, {
        code: '"use strict";app.' + object + '("name", ["Service1", function(Service1){}]);',
        options: [defaultBadService]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            options: [defaultBadService],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            options: [defaultBadService],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        options: [defaultBadService, [object]]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        options: [defaultBadService, [object]]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            options: [defaultBadService, [object]],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            options: [defaultBadService, [object]],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        options: [mapAngularObjectToBarServices]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        options: [mapAngularObjectToBarServices]
    });

    defaultBadService.forEach(function(badService){
        invalid.push({
            code: 'app.' + object + '("name", function(' + badService + '){});',
            options: [mapAngularObjectToBarServices],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        }, {
            code: 'app.' + object + '("name", ["' + badService + '", function(' + badService + '){}]);',
            options: [mapAngularObjectToBarServices],
            errors: [{ message: 'REST API calls should be implemented in a specific service (' + badService + ' in ' + object + ')'}]
        });
    });

});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

eslintTester.run('ng_no_services', rule, {
    valid: valid,
    invalid: invalid
});
