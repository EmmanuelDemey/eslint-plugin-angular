<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/definedundefined.js', 'examples/definedundefined.js'). -->

# definedundefined - use `angular.isDefined` and `angular.isUndefined` instead of other undefined checks

You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined.
We also check the use of !angular.isUndefined and !angular.isDefined (should prefer the reverse function)

## Examples

The following patterns are considered problems;

    /*eslint angular/definedundefined: 2*/

    // invalid
    value === undefined // error: You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined

    // invalid
    value !== undefined // error: You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined

    // invalid
    !angular.isUndefined(value) // error: Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method

    // invalid
    !angular.isDefined(value) // error: Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method

The following patterns are **not** considered problems;

    /*eslint angular/definedundefined: 2*/

    // valid
    angular.isUndefined(value)

    // valid
    angular.isDefined(value)

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/definedundefined.js)
* [Example source](../examples/definedundefined.js)
