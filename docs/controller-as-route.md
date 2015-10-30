<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-as-route.js', 'examples/controller-as-route.js'). -->

# controller-as-route - require the use of controllerAs in routes or states

You should use Angular's controllerAs syntax when defining routes or states.
Implements route part [Y031](https://github.com/johnpapa/angular-styleguide#style-y031)

## Examples

Examples with default configuration

    /*eslint angular/controller-as-route: 2*/

    // valid
    $routeProvider.when('/myroute', {
        controller: 'MyController',
        controllerAs: 'vm'
    });

    // invalid
    $routeProvider.when('/myroute', {
        controller: 'MyController'
    }) // error: Route "/myroute" should use controllerAs syntax

## Links

* [Rule source](../rules/controller-as-route.js)
* [Example source](../examples/controller-as-route.js)
