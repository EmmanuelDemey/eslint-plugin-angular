<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/factory-name.js', 'examples/factory-name.js'). -->

# factory-name - require and specify a prefix for all factory names

All your factories should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your factories by "$" (reserved keyword for AngularJS services) ("factory-name":  [2, "ng"])
*

**Styleguide Reference**

* [y125 by johnpapa - Naming - Factory and Service Names](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y125)

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/factory-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').factory('prefixFactory', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/factory-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('myModule').factory('otherFactory', function () {
        // ...
    }); // error: The otherFactory factory should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/factory-name: [2,"/^xyz/"]*/

    // valid
    angular.module('myModule').factory('xyzFactory', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/factory-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule').factory('myFactory', function () {
        // ...
    }); // error: The myFactory factory should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 1.4.1

## Links

* [Rule source](../rules/factory-name.js)
* [Example source](../examples/factory-name.js)
