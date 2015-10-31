<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/rest-service.js', 'examples/rest-service.js'). -->

# rest-service - disallow different rest service and specify one of '$http', '$resource', 'Restangular'

Check the service used to send request to your REST API.
This rule can have one parameter, with one of the following values: $http, $resource or Restangular ('rest-service': [0, '$http']).

## Examples

Examples with the configuration `"$http"`

    /*eslint angular/rest-service: [2,"$http"]*/

    // valid
    angular.module('myModule').service('myService', function($http) {
        // ...
    });

    // invalid
    angular.module('myModule').service('myService', function($resource) {
        // ...
    }); // error: You should use the same service ($http) for REST API calls

Examples with the configuration `"$resource"`

    /*eslint angular/rest-service: [2,"$resource"]*/

    // valid
    angular.module('myModule').service('myService', function($resource) {
        // ...
    });

    // invalid
    angular.module('myModule').service('myService', function($http) {
        // ...
    }); // error: You should use the same service ($resource) for REST API calls

Examples with the configuration `"Restangular"`

    /*eslint angular/rest-service: [2,"Restangular"]*/

    // valid
    angular.module('myModule').service('myService', function(Restangular) {
        // ...
    });

    // invalid
    angular.module('myModule').service('myService', function($http) {
        // ...
    }); // error: You should use the same service (Restangular) for REST API calls

## Links

* [Rule source](../rules/rest-service.js)
* [Example source](../examples/rest-service.js)
