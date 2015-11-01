<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-services.js', 'examples/no-services.js'). -->

# no-services - disallow DI of specified services

Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm.
The second parameter specifies the services.
The third parameter can be a list of angular objects (controller, factory, etc.).
Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']})

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/no-services: 2*/

    // invalid
    app.controller('MyController', function($http) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in controller)

    // invalid
    app.directive('helloWorld', function($resource) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($resource in directive)

The following patterns are **not** considered problems with default config;

    /*eslint angular/no-services: 2*/

    // valid
    app.controller('MyController', function(myService) {
        // ...
    });

The following patterns are considered problems when configured `["$http","$q"]`:

    /*eslint angular/no-services: [2,["$http","$q"]]*/

    // invalid
    app.directive('helloWorld', function($q) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($q in directive)

The following patterns are **not** considered problems when configured `["$http","$q"]`:

    /*eslint angular/no-services: [2,["$http","$q"]]*/

    // valid
    app.directive('helloWorld', function($resource) {
        // ...
    });

The following patterns are considered problems when configured `["$http","$q"]` and `["directive"]`:

    /*eslint angular/no-services: [2,["$http","$q"],["directive"]]*/

    // invalid
    app.directive('MyController', function($http) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in directive)

The following patterns are **not** considered problems when configured `["$http","$q"]` and `["directive"]`:

    /*eslint angular/no-services: [2,["$http","$q"],["directive"]]*/

    // valid
    app.controller('MyController', function($http) {
        // ...
    });

The following patterns are considered problems when configured `{"directive":["$http","$q"],"controller":["$resource"]}`:

    /*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/

    // invalid
    app.controller('MyController', function($resource, $log) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($resource in controller)

    // invalid
    app.directive('helloWorld', function($http, $log) {
        // ...
    }); // error: REST API calls should be implemented in a specific service ($http in directive)

The following patterns are **not** considered problems when configured `{"directive":["$http","$q"],"controller":["$resource"]}`:

    /*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/

    // valid
    app.controller('MyController', function($http, $q, $log) {
        // ...
    });

    // valid
    app.directive('helloWorld', function($resource, $log) {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/no-services.js)
* [Example source](../examples/no-services.js)
