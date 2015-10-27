<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-services.js', 'examples/no-services.js'). -->

# no-services - disallow DI of specified services

Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm.
The second parameter specifies the services.
The third parameter can be a list of angular objects (controller, factory, etc.).
Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']})

## Examples

Examples with the configuration `["$http","$resource","Restangular","$q"]`

    /*eslint angular/no-services: [2,["$http","$resource","Restangular","$q"]]*/

    // valid
    app.controller('SomeController', function(myService) {
        // ...
    });

## Links

* [Rule source](../rules/no-services.js)
* [Example source](../examples/no-services.js)
