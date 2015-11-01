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

The following patterns are **not** considered problems when configured `"array"`:

    /*eslint angular/di: [2,"array"]*/

    // valid
    angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log, anotherService) {
        // ...
    }]);

The following patterns are **not** considered problems when configured `"$inject"`:

    /*eslint angular/di: [2,"$inject"]*/

    // valid
    angular.module('myModule').factory('myService', myServiceFn);
    myServiceFn.$inject=['$http', '$log', 'anotherService'];
    function myServiceFn($http, $log, anotherService) {
        // ...
    }

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/di.js)
* [Example source](../examples/di.js)
