<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-http-callback.js', 'examples/no-http-callback.js'). -->

# no-http-callback - disallow the `$http` methods `success()` and `error()`

Disallow the $http success and error function.
Instead the standard promise API should be used.

## Examples

The following patterns are considered problems;

    /*eslint angular/no-http-callback: 2*/

    // invalid
    $http.get('api/data').success(function onSuccess() {
        // ...
    }); // error: $http success is deprecated. Use then instead

    // invalid
    $http.get('api/data').error(function onReject() {
        // ...
    }); // error: $http error is deprecated. Use then or catch instead

The following patterns are **not** considered problems;

    /*eslint angular/no-http-callback: 2*/

    // valid
    $http.get('api/data').then(function onSuccess() {
        // ...
    }, function onReject() {
       // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.12.0

## Links

* [Rule source](../rules/no-http-callback.js)
* [Example source](../examples/no-http-callback.js)
