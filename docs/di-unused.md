<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/di-unused.js', 'examples/di-unused.js'). -->

# di-unused - disallow unused DI parameters

Unused dependencies should not be injected.

## Examples

Examples with default configuration

    /*eslint angular/di-unused: 2*/

    // valid
    angular.module('myModule').factory('myService', function ($log, anotherService) {
        $log.log(anotherService.getSomeData());
    });

    // invalid
    angular.module('myModule').factory('myService', function ($http, $q, $log) {
        $http.get('/api/someData').then(function (response) {
            $log.log(response.data);
        });
    }); // error: Unused injected value $q

## Links

* [Rule source](../rules/di-unused.js)
* [Example source](../examples/di-unused.js)
