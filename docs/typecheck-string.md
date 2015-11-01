<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-string.js', 'examples/typecheck-string.js'). -->

# typecheck-string - use `angular.isString` instead of `typeof` comparisons

You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]").

## Examples

Examples with default configuration

    /*eslint angular/typecheck-string: 2*/

    // valid
    angular.isString(someString);

    // invalid
    typeof someString === 'string' // error: You should use the angular.isString method

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-string.js)
* [Example source](../examples/typecheck-string.js)
