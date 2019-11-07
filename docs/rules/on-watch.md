<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/on-watch.js', 'examples/on-watch.js'). -->

# on-watch - require `$on` and `$watch` deregistration callbacks not to be ignored

Deregistration functions returned by Watch and On methods on the scope object should not be ignored, in order to be deleted in a $destroy event handler.
They should be assigned to a variable, returned from a function, put in an array or passed to a function as an argument.

**Rule based on Angular 1.x**

## Examples

The following patterns are considered problems;

    /*eslint angular/on-watch: 2*/

    // invalid
    $rootScope.$on('event', function () {
        // ...
    }); // error: The deregistration function returned by "$on" call call should not be ignored

The following patterns are **not** considered problems;

    /*eslint angular/on-watch: 2*/

    // valid
    $scope.$on('event', function () {
        // ...
    });

    // valid
    var deregister = $rootScope.$on('event', function () {
        // ...
    });

    // valid
    function watchLocalVariable(callback) {
        return $rootScope.$watch(function() {
            return watchLocalVariable;
        }, callback);
    }

    // valid
    var deregisterFns = [
        $rootScope.$on('event', eventHandler),
        $rootScope.$watch('expression', watcherHandler)
    ];

    // valid
    deregisterFns.push($rootScope.$on('event', function() {
        // ...
    }));

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](/rules/on-watch.js)
* [Example source](/examples/on-watch.js)
