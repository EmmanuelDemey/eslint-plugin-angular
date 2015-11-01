<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-setter.js', 'examples/module-setter.js'). -->

# module-setter - disallow to assign modules to variables

Declare modules without a variable using the setter syntax.

**Styleguide Reference**

* [y021 by johnpapa - Module - Definitions (aka Setters)](https://github.com/johnpapa/angular-styleguide#style-y021)

## Examples

Examples with default configuration

    /*eslint angular/module-setter: 2*/

    // valid
    angular.module('myModule', [])

    // invalid
    var app = angular.module('myModule', []); // error: Declare modules without a variable using the setter syntax.

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/module-setter.js)
* [Example source](../examples/module-setter.js)
