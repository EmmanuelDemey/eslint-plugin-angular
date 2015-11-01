<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-services.js', 'examples/no-services.js'). -->

# no-services - disallow DI of specified services

Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm.
The second parameter specifies the services.
The third parameter can be a list of angular objects (controller, factory, etc.).
Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']})

## Examples

Examples with default configuration

    /*eslint angular/no-services: 2*/

    // valid
    app.controller('MyController', function(myService) {
        // ...
    });

    // invalid
    app.controller('MyController', function($http) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in controller)

    // invalid
    app.directive('helloWorld', function($resource) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($resource in directive)

Examples with the configuration `["$http","$q"]`

    /*eslint angular/no-services: [2,["$http","$q"]]*/

    // valid
    app.directive('helloWorld', function($resource) {
        // ...
    });

    // invalid
    app.directive('helloWorld', function($q) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($q in directive)

Examples with the configuration `["$http","$q"]` and `["directive"]`

    /*eslint angular/no-services: [2,["$http","$q"],["directive"]]*/

    // valid
    app.controller('MyController', function($http) {
        // ...
    });

    // invalid
    app.directive('MyController', function($http) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in directive)

Examples with the configuration `{"directive":["$http","$q"],"controller":["$resource"]}`

    /*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/

    // valid
    app.controller('MyController', function($http, $q, $log) {
        // ...
    });

    // valid
    app.directive('helloWorld', function($resource, $log) {
        // ...
    });

    // invalid
    app.controller('MyController', function($resource, $log) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($resource in controller)

    // invalid
    app.directive('helloWorld', function($http, $log) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in directive)

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/no-services.js)
* [Example source](../examples/no-services.js)
