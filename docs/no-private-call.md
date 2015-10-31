<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-private-call.js', 'examples/no-private-call.js'). -->

# no-private-call - disallow use of internal angular properties prefixed with $$

All scope's properties/methods starting with $$ are used internally by AngularJS.
You should not use them directly.
Exception can be allowed with this option: {allow:['$$watchers']}

## Examples

Examples with default configuration

    /*eslint angular/no-private-call: 2*/

    // valid
    $scope.$apply();

    // invalid
    $scope.$$watchers.forEach(function (watcher) {
        // ...
    }); // error: Using $$-prefixed Angular objects/methods are not recommended

Examples with the configuration `{"allow":["$$watchers"]}`

    /*eslint angular/no-private-call: [2,{"allow":["$$watchers"]}]*/

    // valid
    $scope.$$watchers.forEach(function (watcher) {
        // ...
    });

    // invalid
    $scope.$$listeners.forEach(function (listener) {
        // ...
    }); // error: Using $$-prefixed Angular objects/methods are not recommended

## Links

* [Rule source](../rules/no-private-call.js)
* [Example source](../examples/no-private-call.js)
