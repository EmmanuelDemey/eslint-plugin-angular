<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-date.js', 'examples/typecheck-date.js'). -->

# typecheck-date - use `angular.isDate` instead of `typeof` comparisons

You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]").

## Examples

The following patterns are considered problems;

    /*eslint angular/typecheck-date: 2*/

    // invalid
    Object.prototype.toString.call(someDate) === '[object Date]'; // error: You should use the angular.isDate method

The following patterns are **not** considered problems;

    /*eslint angular/typecheck-date: 2*/

    // valid
    angular.isDate(someDate);

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-date.js)
* [Example source](../examples/typecheck-date.js)
