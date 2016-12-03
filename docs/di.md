<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/di.js', 'examples/di.js'). -->

# di - require a consistent DI syntax

All your DI should use the same syntax : the Array, function, or $inject syntaxes ("di":  [2, "array, function, or $inject"])

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/di: 2*/

    // invalid
    angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log, anotherService) {
        // ...
    }]); // error: You should use the function syntax for DI

The following patterns are **not** considered problems with default config;

    /*eslint angular/di: 2*/

    // valid
    angular.module('myModule').factory('myService', function ($http, $log, anotherService) {
       // ...
    });

The following patterns are considered problems when configured `"array"`:

    /*eslint angular/di: [2,"array"]*/

    // invalid
    angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log) {
        // ...
    }]); // error: The signature of the method is incorrect

    // invalid
    angular.module('myModule').factory('myService', ['$http', '$log', function ($log, $http) {
        // ...
    }]); // error: You have an error in your DI configuration. Each items of the array should match exactly one function parameter

    // invalid
    angular.module('myModule').factory('myService', ['$http', function ($http, $log) {
        // ...
    }]); // error: The signature of the method is incorrect

The following patterns are **not** considered problems when configured `"array"`:

    /*eslint angular/di: [2,"array"]*/

    // valid
    angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log, anotherService) {
        // ...
    }]);

The following patterns are **not** considered problems when configured `"array"` and `{"matchNames":false}`:

    /*eslint angular/di: [2,"array",{"matchNames":false}]*/

    // valid
    angular.module('myModule').factory('myService', ['eslintService', function (service) {
        // ...
    }]);

The following patterns are considered problems when configured `"$inject"`:

    /*eslint angular/di: [2,"$inject"]*/

    // invalid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['$http', '$log', 'anotherService'];
    function myServiceFn($http, $log) {
        // ...
    } // error: The signature of the method is incorrect

    // invalid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['$http', '$log'];
    function myServiceFn($http, $log, anotherService) {
        // ...
    } // error: The signature of the method is incorrect

    // invalid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['$log', '$http'];
    function myServiceFn($http, $log) {
        // ...
    } // error: You have an error in your DI configuration. Each items of the array should match exactly one function parameter

The following patterns are **not** considered problems when configured `"$inject"`:

    /*eslint angular/di: [2,"$inject"]*/

    // valid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['$http', '$log', 'anotherService'];
    function myServiceFn($http, $log, anotherService) {
        // ...
    }

The following patterns are **not** considered problems when configured `"$inject"` and `{"matchNames":false}`:

    /*eslint angular/di: [2,"$inject",{"matchNames":false}]*/

    // valid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['eslintService'];
    function myServiceFn(Service) {
        // ...
    }

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/di.js)
* [Example source](../examples/di.js)
