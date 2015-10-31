<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-setter.js', 'examples/module-setter.js'). -->

# module-setter - disallow to assign modules to variables

Declare modules without a variable using the setter syntax.[Y021](https://github.com/johnpapa/angular-styleguide#style-y021)

## Examples

Examples with default configuration

    /*eslint angular/module-setter: 2*/

    // valid
    angular.module('myModule', [])

    // invalid
    var app = angular.module('myModule', []); // error: Declare modules without a variable using the setter syntax.

## Links

* [Rule source](../rules/module-setter.js)
* [Example source](../examples/module-setter.js)
