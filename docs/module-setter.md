<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-setter.js', 'examples/module-setter.js'). -->

# module-setter - disallow to assign modules to variables

Declare modules without a variable using the setter syntax.

**Styleguide Reference**

* [y021 by johnpapa - Module - Definitions (aka Setters)](https://github.com/johnpapa/angular-styleguide#style-y021)

## Examples

The following patterns are considered problems;

    /*eslint angular/module-setter: 2*/

    // invalid
    var app = angular.module('myModule', []); // error: Declare modules without a variable using the setter syntax.

The following patterns are **not** considered problems;

    /*eslint angular/module-setter: 2*/

    // valid
    angular.module('myModule', [])

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/module-setter.js)
* [Example source](../examples/module-setter.js)
