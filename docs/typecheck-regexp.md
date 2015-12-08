<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/typecheck-regexp.js', 'examples/typecheck-regexp.js'). -->

# typecheck-regexp - use `angular.isRegexp` instead of other comparisons

**This rule is deprecated and will be removed in future versions. Explanation: `angular.isRegexp` is no built-in angular method.**

You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]").

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/typecheck-regexp.js)
* [Example source](../examples/typecheck-regexp.js)
