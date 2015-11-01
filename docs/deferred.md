<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/deferred.js', 'examples/deferred.js'). -->

# deferred - use `$q(function(resolve, reject){})` instead of `$q.deferred`

When you want to create a new promise, you should not use the $q.deferred anymore.
Prefer the new syntax : $q(function(resolve, reject){})

## Examples

Examples with default configuration

    /*eslint angular/deferred: 2*/

    // valid
    $q(function() {
        // ...
    });

    // invalid
    var deferred = $q.defer(); // error: You should not create a new promise with this syntax. Use the $q(function(resolve, reject) {}) syntax.

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/deferred.js)
* [Example source](../examples/deferred.js)
