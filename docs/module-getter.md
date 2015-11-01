<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-getter.js', 'examples/module-getter.js'). -->

# module-getter - enforce to reference modules with the getter syntax

When using a module, avoid using a variable and instead use chaining with the getter syntax

**Styleguide Reference**

* [y022 by johnpapa - Module - Getters](https://github.com/johnpapa/angular-styleguide#style-y022)

## Examples

The following patterns are considered problems;

    /*eslint angular/module-getter: 2*/

    // invalid
    app.controller('MyController', function () {
        // ...
    }); // error: Avoid using a variable and instead use chaining with the getter syntax.

The following patterns are **not** considered problems;

    /*eslint angular/module-getter: 2*/

    // valid
    angular.module('myModule').controller('MyController', function () {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/module-getter.js)
* [Example source](../examples/module-getter.js)
