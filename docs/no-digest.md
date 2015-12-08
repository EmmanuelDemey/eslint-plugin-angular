<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-digest.js', 'examples/no-digest.js'). -->

# no-digest - use `$apply()` instead of `$digest()`

**This rule is deprecated and will be removed in future versions. Explanation: There is no reason to forbid the use of `$digest()` in general.**

The scope's $digest() method shouldn't be used.
You should prefer the $apply method.

The `watchers-execution` rule can be configured to enforce the use of `$apply()` or `$digest()`.

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/no-digest.js)
* [Example source](../examples/no-digest.js)
