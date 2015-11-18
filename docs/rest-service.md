<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/rest-service.js', 'examples/rest-service.js'). -->

# rest-service - disallow different rest service and specify one of '$http', '$resource', 'Restangular'

Check the service used to send request to your REST API.
This rule can have one parameter, with one of the following values: $http, $resource or Restangular ('rest-service': [0, '$http']).

## Examples

The following patterns are considered problems when configured `"$http"`:

    /*eslint angular/rest-service: [2,"$http"]*/

    // invalid
    angular.module('myModule').service('myService', function($resource) {
        // ...
    }); // error: You should use the same service ($http) for REST API calls

The following patterns are **not** considered problems when configured `"$http"`:

    /*eslint angular/rest-service: [2,"$http"]*/

    // valid
    angular.module('myModule').service('myService', function($http) {
        // ...
    });

The following patterns are considered problems when configured `"$resource"`:

    /*eslint angular/rest-service: [2,"$resource"]*/

    // invalid
    angular.module('myModule').service('myService', function($http) {
        // ...
    }); // error: You should use the same service ($resource) for REST API calls

The following patterns are **not** considered problems when configured `"$resource"`:

    /*eslint angular/rest-service: [2,"$resource"]*/

    // valid
    angular.module('myModule').service('myService', function($resource) {
        // ...
    });

The following patterns are considered problems when configured `"Restangular"`:

    /*eslint angular/rest-service: [2,"Restangular"]*/

    // invalid
    angular.module('myModule').service('myService', function($http) {
        // ...
    }); // error: You should use the same service (Restangular) for REST API calls

The following patterns are **not** considered problems when configured `"Restangular"`:

    /*eslint angular/rest-service: [2,"Restangular"]*/

    // valid
    angular.module('myModule').service('myService', function(Restangular) {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.5.0

## Links

* [Rule source](../rules/rest-service.js)
* [Example source](../examples/rest-service.js)
