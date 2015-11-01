<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/watchers-execution.js', 'examples/watchers-execution.js'). -->

# watchers-execution - require and specify consistent use `$scope.digest()` or `$scope.apply()`

For the execution of the watchers, the $digest method will start from the scope in which we call the method.
This will cause an performance improvement comparing to the $apply method, who start from the $rootScope

## Examples

The following patterns are considered problems when configured `"$apply"`:

    /*eslint angular/watchers-execution: [2,"$apply"]*/

    // invalid
    $scope.$digest(); // error: Instead of using the $digest() method, you should prefer $apply()

The following patterns are **not** considered problems when configured `"$apply"`:

    /*eslint angular/watchers-execution: [2,"$apply"]*/

    // valid
    $scope.$apply(function() {
        // ...
    });

The following patterns are considered problems when configured `"$digest"`:

    /*eslint angular/watchers-execution: [2,"$digest"]*/

    // invalid
    $scope.$apply(function() {
        // ...
    }); // error: Instead of using the $apply() method, you should prefer $digest()

The following patterns are **not** considered problems when configured `"$digest"`:

    /*eslint angular/watchers-execution: [2,"$digest"]*/

    // valid
    $scope.$digest();

## Version

This rule was introduced in eslint-plugin-angular 0.4.0

## Links

* [Rule source](../rules/watchers-execution.js)
* [Example source](../examples/watchers-execution.js)
