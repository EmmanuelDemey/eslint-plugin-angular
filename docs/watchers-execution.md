<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/watchers-execution.js', 'examples/watchers-execution.js'). -->

# watchers-execution - require and specify consistent use `$scope.digest()` or `$scope.apply()`

For the execution of the watchers, the $digest method will start from the scope in which we call the method.
This will cause an performance improvement comparing to the $apply method, who start from the $rootScope

## Links

* [Rule source](../rules/watchers-execution.js)
* [Example source](../examples/watchers-execution.js)
