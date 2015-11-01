<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/directive-restrict.js', 'examples/directive-restrict.js'). -->

# directive-restrict - disallow any other directive restrict than 'A' or 'E'

Not all directive restrictions may be desirable.
Also it might be desirable to define default restrictions, or explicitly not.
The default configuration limits the restrictions `AE` and disallows explicitly specifying a default.
("directive-restrict": [0, {"restrict": "AE", "explicit": "never"}])

**Styleguide Reference**

* [y074 by johnpapa - Restrict to Elements and Attributes](https://github.com/johnpapa/angular-styleguide#style-y074)

## Examples

The following patterns are **not** considered problems with default config;

    /*eslint angular/directive-restrict: 2*/

    // valid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>',
            restrict: 'A' // also allowed: A, E, AE, EA
        };
    });

    // valid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>'
            // no explicit restrict is allowed by default
        };
    });

The following patterns are considered problems when configured `{"explicit":"always"}`:

    /*eslint angular/directive-restrict: [2,{"explicit":"always"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>'
        };
    }); // error: Missing directive restriction

The following patterns are considered problems when configured `{"explicit":"never"}`:

    /*eslint angular/directive-restrict: [2,{"explicit":"never"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>',
            restrict: 'AE'
        };
    }); // error: No need to explicitly specify a default directive restriction

The following patterns are considered problems when configured `{"restrict":"A"}`:

    /*eslint angular/directive-restrict: [2,{"restrict":"A"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>',
            restrict: 'E'
        };
    }); // error: Disallowed directive restriction. It must be one of A in that order

## Version

This rule was introduced in eslint-plugin-angular 0.12.0

## Links

* [Rule source](../rules/directive-restrict.js)
* [Example source](../examples/directive-restrict.js)
