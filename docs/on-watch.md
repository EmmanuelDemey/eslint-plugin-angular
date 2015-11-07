<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/on-watch.js', 'examples/on-watch.js'). -->

# on-watch - require `$on` and `$watch` deregistration callbacks to be saved in a variable

Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler

## Examples

The following patterns are considered problems;

    /*eslint angular/on-watch: 2*/

    // invalid
    $rootScope.$on('event', function () {
        // ...
    }); // error: The "$on" call should be assigned to a variable, in order to be destroyed during the $destroy event

The following patterns are **not** considered problems;

    /*eslint angular/on-watch: 2*/

    // valid
    $scope.$on('event', function () {
        // ...
    });

    // valid
    var unregister = $rootScope.$on('event', function () {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/on-watch.js)
* [Example source](../examples/on-watch.js)
