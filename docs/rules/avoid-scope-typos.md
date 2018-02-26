<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/avoid-scope-typos.js', 'examples/avoid-scope-typos.js'). -->

# avoid-scope-typos - Avoid mistakes when naming methods defined on the scope object

For example, you want to use $scope.$watch instead of $scope.watch

**Rule based on Angular 1.x**

## Examples

The following patterns are considered problems;

    /*eslint angular/avoid-scope-typos: 2*/

    // invalid
    $scope.apply.forEach(function (watcher) {
        // ...
    }); // error: The apply method should be replaced by $apply, or you should rename it in order to avoid confusions

    // invalid
    $rootScope.apply.forEach(function (watcher) {
        // ...
    }); // error: The apply method should be replaced by $apply, or you should rename it in order to avoid confusions

The following patterns are **not** considered problems;

    /*eslint angular/avoid-scope-typos: 2*/

    // valid
    $scope.$apply();

    // valid
    $rootScope.$apply();

## Version

This rule was introduced in eslint-plugin-angular 2.3.0

## Links

* [Rule source](/rules/avoid-scope-typos.js)
* [Example source](/examples/avoid-scope-typos.js)
