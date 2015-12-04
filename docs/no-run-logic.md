<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-run-logic.js', 'examples/no-run-logic.js'). -->

# no-run-logic - keep run functions clean and simple

Initialization logic should be moved into a factory or service. This improves testability.

**Styleguide Reference**

* [y171 by johnpapa - Run Blocks](https://github.com/johnpapa/angular-styleguide#style-y171)

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/no-run-logic: 2*/

    // invalid
    angular.module('app').run(function($window) {
        $window.addEventListener('deviceready', deviceready);

        function deviceready() {}
    }); // error: The run function may only contain call expressions

The following patterns are **not** considered problems with default config;

    /*eslint angular/no-run-logic: 2*/

    // valid
    angular.module('app').run(function(KITTENS, kittenService, startup) {
        kittenService.prefetchData(KITTENS);
        startup('foo', true, 1);
    });

The following patterns are considered problems when configured `{"allowParams":false}`:

    /*eslint angular/no-run-logic: [2,{"allowParams":false}]*/

    // invalid
    angular.module('app').run(function(startup) {
        startup('foo', true, 1);
    }); // error: Run function call expressions may not take any arguments

The following patterns are **not** considered problems when configured `{"allowParams":false}`:

    /*eslint angular/no-run-logic: [2,{"allowParams":false}]*/

    // valid
    angular.module('app').run(function(kittenService, startup) {
        kittenService.prefetchData();
        startup();
    });

## Version

This rule was introduced in eslint-plugin-angular 0.15.0

## Links

* [Rule source](../rules/no-run-logic.js)
* [Example source](../examples/no-run-logic.js)
