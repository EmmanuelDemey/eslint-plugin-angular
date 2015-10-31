<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/watchers-execution.js', 'examples/watchers-execution.js'). -->

# watchers-execution - require and specify consistent use `$scope.digest()` or `$scope.apply()`

For the execution of the watchers, the $digest method will start from the scope in which we call the method.
This will cause an performance improvement comparing to the $apply method, who start from the $rootScope

## Examples

Examples with the configuration `"$apply"`

    /*eslint angular/watchers-execution: [2,"$apply"]*/

    // valid
    $scope.$apply(function() {
        // ...
    });

    // invalid
    $scope.$digest(); // error: Instead of using the $digest() method, you should prefer $apply()

Examples with the configuration `"$digest"`

    /*eslint angular/watchers-execution: [2,"$digest"]*/

    // valid
    $scope.$digest();

    // invalid
    $scope.$apply(function() {
        // ...
    }); // error: Instead of using the $apply() method, you should prefer $digest()

## Links

* [Rule source](../rules/watchers-execution.js)
* [Example source](../examples/watchers-execution.js)
