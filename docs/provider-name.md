<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/provider-name.js', 'examples/provider-name.js'). -->

# provider-name - require and specify a prefix for all provider names

All your providers should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your providers by "$" (reserved keyword for AngularJS services) ("provider-name":  [2, "ng"])
*

**Styleguide Reference**

* [y125 by johnpapa - Naming - Factory and Service Names](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y125)

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/provider-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').provider('prefixProvider', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/provider-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('myModule').provider('otherProvider', function () {
        // ...
    }); // error: The otherProvider provider should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/provider-name: [2,"/^xyz/"]*/

    // valid
    angular.module('myModule').provider('xyzProvider', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/provider-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule').provider('myProvider', function () {
        // ...
    }); // error: The myProvider provider should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/provider-name.js)
* [Example source](../examples/provider-name.js)
