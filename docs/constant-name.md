<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/constant-name.js', 'examples/constant-name.js'). -->

# constant-name - require and specify a prefix for all constant names

All your constants should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your constants by "$" (reserved keyword for AngularJS services) ("constant-name":  [2, "ng"])
*

**Styleguide Reference**

* [y125 by johnpapa - Naming - Factory and Service Names](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y125)

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/constant-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').constant('prefixConstant', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/constant-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('myModule').constant('otherConstant', function () {
        // ...
    }); // error: The otherConstant constant should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/constant-name: [2,"/^xyz/"]*/

    // valid
    angular.module('myModule').constant('xyzConstant', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/constant-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule').constant('myConstant', function () {
        // ...
    }); // error: The myConstant constant should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 1.4.1

## Links

* [Rule source](../rules/constant-name.js)
* [Example source](../examples/constant-name.js)
