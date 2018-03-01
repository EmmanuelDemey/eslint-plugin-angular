<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/on-destroy.js', 'examples/on-destroy.js'). -->

# on-destroy - Check for common misspelling $on('destroy', ...).

It should be $on('$destroy', ...).

**Rule based on Angular 1.x**

## Examples

The following patterns are considered problems;

    /*eslint angular/on-destroy: 2*/

    // invalid
    $rootScope.$on('destroy', function () {
        // ...
    }); // error: You probably misspelled $on("$destroy").

The following patterns are **not** considered problems;

    /*eslint angular/on-destroy: 2*/

    // valid
    $scope.$on('$destroy', function () {
        // ...
    });

    // valid
    var unregister = $rootScope.$on('$destroy', function () {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](/rules/on-destroy.js)
* [Example source](/examples/on-destroy.js)
