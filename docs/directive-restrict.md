<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/directive-restrict.js', 'examples/directive-restrict.js'). -->

# directive-restrict - disallow any other directive restrict than 'A' or 'E'

Not all directive restrictions may be desirable.
Also it might be desirable to define default restrictions, or explicitly not.
The default configuration limits the restrictions `AE` [Y074](https://github.com/johnpapa/angular-styleguide#style-y074) and disallows explicitly specifying a default.
("directive-restrict": [0, {"restrict": "AE", "explicit": "never"}])

## Examples

Examples with default configuration

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

Examples with the configuration `{"explicit":"always"}`

    /*eslint angular/directive-restrict: [2,{"explicit":"always"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>'
        };
    }); // error: Missing directive restriction

Examples with the configuration `{"explicit":"never"}`

    /*eslint angular/directive-restrict: [2,{"explicit":"never"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>',
            restrict: 'AE'
        };
    }); // error: No need to explicitly specify a default directive restriction

Examples with the configuration `{"restrict":"A"}`

    /*eslint angular/directive-restrict: [2,{"restrict":"A"}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<h2>Hello World!</h2>',
            restrict: 'E'
        };
    }); // error: Disallowed directive restriction. It must be one of A in that order

## Links

* [Rule source](../rules/directive-restrict.js)
* [Example source](../examples/directive-restrict.js)
