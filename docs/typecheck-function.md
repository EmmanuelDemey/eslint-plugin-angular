<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-function.js', 'examples/typecheck-function.js'). -->

# typecheck-function - use `angular.isFunction` instead of `typeof` comparisons

You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]").

## Examples

The following patterns are considered problems;

    /*eslint angular/typecheck-function: 2*/

    // invalid
    typeof someFunction === 'function' // error: You should use the angular.isFunction method

The following patterns are **not** considered problems;

    /*eslint angular/typecheck-function: 2*/

    // valid
    angular.isFunction(someFunction);

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-function.js)
* [Example source](../examples/typecheck-function.js)
