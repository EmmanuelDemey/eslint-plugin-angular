<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/value-name.js', 'examples/value-name.js'). -->

# value-name - require and specify a prefix for all value names

All your values should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your values by "$" (reserved keyword for AngularJS services) ("value-name":  [2, "ng"])
*

**Styleguide Reference**

* [y125 by johnpapa - Naming - Factory and Service Names](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y125)

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/value-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').value('prefixValue', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/value-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('myModule').value('otherValue', function () {
        // ...
    }); // error: The otherValue value should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/value-name: [2,"/^xyz/"]*/

    // valid
    angular.module('myModule').value('xyzValue', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/value-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule').value('myValue', function () {
        // ...
    }); // error: The myValue value should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 1.4.1

## Links

* [Rule source](../rules/value-name.js)
* [Example source](../examples/value-name.js)
