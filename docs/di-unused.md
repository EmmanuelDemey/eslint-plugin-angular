<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/di-unused.js', 'examples/di-unused.js'). -->

# di-unused - disallow unused DI parameters

Unused dependencies should not be injected.

## Examples

The following patterns are considered problems;

    /*eslint angular/di-unused: 2*/

    // invalid
    angular.module('myModule').factory('myService', function ($http, $q, $log) {
        $http.get('/api/someData').then(function (response) {
            $log.log(response.data);
        });
    }); // error: Unused injected value $q

The following patterns are **not** considered problems;

    /*eslint angular/di-unused: 2*/

    // valid
    angular.module('myModule').factory('myService', function ($log, anotherService) {
        $log.log(anotherService.getSomeData());
    });

## Version

This rule was introduced in eslint-plugin-angular 0.8.0

## Links

* [Rule source](../rules/di-unused.js)
* [Example source](../examples/di-unused.js)
