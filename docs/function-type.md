<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/function-type.js', 'examples/function-type.js'). -->

# function-type - require and specify a consistent function style for components

Anonymous or named functions inside AngularJS components.
The first parameter sets which type of function is required and can be 'named' or 'anonymous'.
The second parameter is an optional list of angular object names.

**Styleguide Reference**

* [y024 by johnpapa - Named vs Anonymous Functions](https://github.com/johnpapa/angular-styleguide#style-y024)

## Examples

Examples with the configuration `"anonymous"`

    /*eslint angular/function-type: [2,"anonymous"]*/

    // valid
    angular.module('myModule').factory('myService', function () {
        // ...
    });

    // invalid
    angular.module('myModule').factory('myService', myServiceFn);
    function myServiceFn() {
        // ...
    } // error: Use anonymous functions instead of named function

Examples with the configuration `"named"`

    /*eslint angular/function-type: [2,"named"]*/

    // valid
    angular.module('myModule').factory('myService', function myService() {
        // ...
    });

    // valid
    angular.module('myModule').factory('myService', myServiceFn);
    function myServiceFn() {
        // ...
    }

    // invalid
    angular.module('myModule').factory('myService', function () {
        // ...
    }); // error: Use named functions instead of anonymous function

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/function-type.js)
* [Example source](../examples/function-type.js)
