<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-as-route.js', 'examples/controller-as-route.js'). -->

# controller-as-route - require the use of controllerAs in routes or states

You should use Angular's controllerAs syntax when defining routes or states.

**Styleguide Reference**

* [y031 by johnpapa - controllerAs Controller Syntax](https://github.com/johnpapa/angular-styleguide#style-y031)

## Examples

The following patterns are considered problems;

    /*eslint angular/controller-as-route: 2*/

    // invalid
    $routeProvider.when('/myroute', {
        controller: 'MyController'
    }) // error: Route "/myroute" should use controllerAs syntax

The following patterns are **not** considered problems;

    /*eslint angular/controller-as-route: 2*/

    // valid
    $routeProvider.when('/myroute', {
        controller: 'MyController',
        controllerAs: 'vm'
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/controller-as-route.js)
* [Example source](../examples/controller-as-route.js)
