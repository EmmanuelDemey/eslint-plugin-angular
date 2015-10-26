# component-limit - limit the number of angular components per file

The number of AngularJS components in one file should be limited.
The default limit is one, which follows  [Y001](https://github.com/johnpapa/angular-styleguide#style-y001)

## Examples

Examples with default configuration

    /*eslint angular/component-limit: 2*/

    // valid
    app.controller('SomeController', function() {
        // ...
    });

    // valid
    angular.module('myModule').directive('myDirective', function() {
        // ...
    });

    // invalid
    app.controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }); // error: There may be at most 1 AngularJS component per file, but found 2

Examples with the configuration `3`

    /*eslint angular/component-limit: [2,3]*/

    // valid
    app.controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }).factory('serviceThree', function() {
        // ...
    });

    // invalid
    app.controller('ControllerOne', function() {
        // ...
    }).directive('directiveTwo', function() {
        // ...
    }).factory('serviceThree', function() {
        // ...
    }).filter('filterFour', function() {
        // ...
    }); // error: There may be at most 3 AngularJS components per file, but found 4
