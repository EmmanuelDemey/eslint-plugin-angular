<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-number.js', 'examples/typecheck-number.js'). -->

# typecheck-number - use `angular.isNumber` instead of `typeof` comparisons

You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]").

## Examples

Examples with default configuration

    /*eslint angular/typecheck-number: 2*/

    // valid
    angular.isNumber(someNumber);

    // invalid
    typeof someNumber === 'number' // error: You should use the angular.isNumber method

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-number.js)
* [Example source](../examples/typecheck-number.js)
