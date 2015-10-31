<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-array.js', 'examples/typecheck-array.js'). -->

# typecheck-array - use `angular.isArray` instead of `typeof` comparisons

You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]").

## Examples

Examples with default configuration

    /*eslint angular/typecheck-array: 2*/

    // valid
    angular.isArray(someArray);

    // invalid
    Object.prototype.toString.call(someArray) === '[object Array]'; // error: You should use the angular.isArray method

## Links

* [Rule source](../rules/typecheck-array.js)
* [Example source](../examples/typecheck-array.js)
