//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

var angularObjectList = ['controller', 'filter', 'factory', 'service'];
var valid = [], invalid = [];

angularObjectList.forEach(function(object){
    valid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        args: [1, 'anonymous']
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, 'anonymous']
    });

    invalid.push({
        code: 'app.' + object + '("name", function(Service1){});',
        args: [1, 'named'],
        errors: [{ message: 'Use named functions instead of anonymous function'}]
    }, {
        code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, 'named'],
        errors: [{ message: 'Use named functions instead of anonymous function'}]
    });

    invalid.push({
        code: 'function func(Service1){};app.' + object + '("name", func);',
        args: [1, 'anonymous'],
        errors: [{ message: 'Use anonymous functions instead of named function'}]
    }, {
        code: 'function func(Service1){};app.' + object + '("name", ["Service1", func]);',
        args: [1, 'anonymous'],
        errors: [{ message: 'Use anonymous functions instead of named function'}]
    });

    valid.push({
        code: 'function func(Service1){};app.' + object + '("name", func);',
        args: [1, 'named']
    }, {
        code: 'function func(Service1){};app.' + object + '("name", ["Service1", func]);',
        args: [1, 'named']
    });

});

// with third param
valid.push({
    code: 'app.controller("name", function(Service1){});',
    args: [1, 'anonymous', ['controller']]
}, {
    code: 'app.controller("name", ["Service1", function(Service1){}]);',
    args: [1, 'anonymous', ['controller']]
});

valid.push({
    code: 'var cleanUp;cleanUp = $rootScope.$on("$stateChangeSuccess", function () {vm.currentHor = $state.$current.path[0].self.name;});$scope.$on("$destroy", function () {cleanUp();});',
    args: [1, 'named']
}, {
    code: 'var cleanUp;cleanUp = $rootScope.$on("$stateChangeSuccess", function () {vm.currentHor = $state.$current.path[0].self.name;});$scope.$on("$destroy", function () {cleanUp();});',
    args: [1, 'anonymous']
});

invalid.push({
    code: 'app.controller("name", function(Service1){});',
    args: [1, 'named', ['controller']],
    errors: [{ message: 'Use named functions instead of anonymous function'}]
}, {
    code: 'app.controller("name", ["Service1", function(Service1){}]);',
    args: [1, 'named', ['controller']],
    errors: [{ message: 'Use named functions instead of anonymous function'}]
});

invalid.push({
    code: 'function func(Service1){};app.controller("name", func);',
    args: [1, 'anonymous', ['controller']],
    errors: [{ message: 'Use anonymous functions instead of named function'}]
}, {
    code: 'function func(Service1){};app.controller("name", ["Service1", func]);',
    args: [1, 'anonymous', ['controller']],
    errors: [{ message: 'Use anonymous functions instead of named function'}]
});

valid.push({
    code: 'function func(Service1){};app.controller("name", func);',
    args: [1, 'named', ['controller']]
}, {
    code: 'function func(Service1){};app.controller("name", ["Service1", func]);',
    args: [1, 'named', ['controller']]
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_function_type', {
    valid: valid,
    invalid: invalid
});
