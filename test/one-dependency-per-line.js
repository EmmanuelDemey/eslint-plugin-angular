'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/one-dependency-per-line');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('one-dependency-per-line', rule, {
    valid: [
        '(function() {\n  "use strict";\napp.controller("", function($http) {});\n})();',
        'app.controller("", function($http) {});',
        'app.controller("", function($http,\n $q) {});',
        'app.controller("", func); function func($q) {}',
        'app.controller("", func); function func($http,\n $q) {}',
        'app.controller("", ["$http", function($http) {}]);',
        'app.controller("", ["$http", func]); function func($http){}',
        'app.controller("", ["$http",\n "$q", function($http, \n$q) {}]);',
        'app.controller("", ["$http",\n "$q", func]); function func($http,\n$q){}',
        'var func = function($http){}; app.controller("", func);'
    ],
    invalid: [{
        code: '(function() {\n  "use strict";\napp.controller("", function($q, $http) {});\n})();',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", function($q, $http) {});',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", func); function func($q, $http) {}',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", ["$http",\n "$q", function($http, $q) {}]);',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", ["$http", "$q", function($http,\n $q) {}]);',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", ["$http", "$q", func]); function func($http,\n$q){}',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'app.controller("", ["$http",\n "$q", func]); function func($http,$q){}',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    },
    {
        code: 'var func = function($http, $q){}; app.controller("", func);',
        errors: [{message: 'Do not use multiple dependencies in one line'}]
    }]
});

