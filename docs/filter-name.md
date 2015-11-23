<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/filter-name.js', 'examples/filter-name.js'). -->

# filter-name - require and specify a prefix for all filter names

All your filters should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
("filter-name":  [2, "ng"])

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/filter-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').filter('prefixFilter', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/filter-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('myModule').filter('otherFilter', function () {
        // ...
    }); // error: The otherFilter filter should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/filter-name: [2,"/^xyz/"]*/

    // valid
    angular.module('myModule').filter('xyzFilter', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/filter-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule').filter('someFilter', function () {
        // ...
    }); // error: The someFilter filter should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/filter-name.js)
* [Example source](../examples/filter-name.js)
