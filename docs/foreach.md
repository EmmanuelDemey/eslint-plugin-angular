<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/foreach.js', 'examples/foreach.js'). -->

# foreach - use `angular.forEach` instead of native `Array.prototype.forEach`

You should use the angular.forEach method instead of the default JavaScript implementation [].forEach.

## Examples

The following patterns are considered problems;

    /*eslint angular/foreach: 2*/

    // invalid
    someArray.forEach(function (element) {
        // ...
    }); // error: You should use the angular.forEach method

The following patterns are **not** considered problems;

    /*eslint angular/foreach: 2*/

    // valid
    angular.forEach(someArray, function (element) {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/foreach.js)
* [Example source](../examples/foreach.js)
