<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-object.js', 'examples/typecheck-object.js'). -->

# typecheck-object - use `angular.isObject` instead of `typeof` comparisons

You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").

## Examples

The following patterns are considered problems;

    /*eslint angular/typecheck-object: 2*/

    // invalid
    typeof someObject === 'object' // error: You should use the angular.isObject method

The following patterns are **not** considered problems;

    /*eslint angular/typecheck-object: 2*/

    // valid
    angular.isObject(someObject);

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-object.js)
* [Example source](../examples/typecheck-object.js)
