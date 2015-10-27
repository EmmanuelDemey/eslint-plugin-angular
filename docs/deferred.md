<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/deferred.js', 'examples/deferred.js'). -->

# deferred - use `$q(function(resolve, reject){})` instead of `$q.deferred`

When you want to create a new promise, you should not use the $q.deferred anymore.
Prefer the new syntax : $q(function(resolve, reject){})

## Links

* [Rule source](../rules/deferred.js)
* [Example source](../examples/deferred.js)
