<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-http-callback.js', 'examples/no-http-callback.js'). -->

# no-http-callback - disallow the `$http` methods `success()` and `error()`

Disallow the $http success and error function.
Instead the standard promise API should be used.

## Examples

Examples with default configuration

    /*eslint angular/no-http-callback: 2*/

    // valid
    $http.get('api/data').then(function onSuccess() {
        // ...
    }, function onReject() {
       // ...
    });

    // invalid
    $http.get('api/data').success(function onSuccess() {
        // ...
    }); // error: $http success is deprecated. Use then instead

    // invalid
    $http.get('api/data').error(function onReject() {
        // ...
    }); // error: $http error is deprecated. Use then or catch instead

## Links

* [Rule source](../rules/no-http-callback.js)
* [Example source](../examples/no-http-callback.js)
