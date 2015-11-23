<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/component-limit.js', 'examples/component-limit.js'). -->

# component-limit - limit the number of angular components per file

The number of AngularJS components in one file should be limited.
The default limit is one.

**Styleguide Reference**

* [y001 by johnpapa - Define 1 component per file](https://github.com/johnpapa/angular-styleguide#style-y001)

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/component-limit: 2*/

    // invalid
    angular.module('myModule').controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }); // error: There may be at most 1 AngularJS component per file, but found 2

The following patterns are **not** considered problems with default config;

    /*eslint angular/component-limit: 2*/

    // valid
    angular.module('myModule').controller('SomeController', function() {
        // ...
    });

    // valid
    angular.module('myModule').directive('myDirective', function() {
        // ...
    });

The following patterns are considered problems when configured `3`:

    /*eslint angular/component-limit: [2,3]*/

    // invalid
    angular.module('myModule').controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }).factory('serviceThree', function() {
        // ...
    }).filter('filterFour', function() {
        // ...
    }); // error: There may be at most 3 AngularJS components per file, but found 4

The following patterns are **not** considered problems when configured `3`:

    /*eslint angular/component-limit: [2,3]*/

    // valid
    angular.module('myModule').controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }).factory('serviceThree', function() {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.11.0

## Links

* [Rule source](../rules/component-limit.js)
* [Example source](../examples/component-limit.js)
