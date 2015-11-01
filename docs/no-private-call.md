<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-private-call.js', 'examples/no-private-call.js'). -->

# no-private-call - disallow use of internal angular properties prefixed with $$

All scope's properties/methods starting with $$ are used internally by AngularJS.
You should not use them directly.
Exception can be allowed with this option: {allow:['$$watchers']}

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/no-private-call: 2*/

    // invalid
    $scope.$$watchers.forEach(function (watcher) {
        // ...
    }); // error: Using $$-prefixed Angular objects/methods are not recommended

The following patterns are **not** considered problems with default config;

    /*eslint angular/no-private-call: 2*/

    // valid
    $scope.$apply();

The following patterns are considered problems when configured `{"allow":["$$watchers"]}`:

    /*eslint angular/no-private-call: [2,{"allow":["$$watchers"]}]*/

    // invalid
    $scope.$$listeners.forEach(function (listener) {
        // ...
    }); // error: Using $$-prefixed Angular objects/methods are not recommended

The following patterns are **not** considered problems when configured `{"allow":["$$watchers"]}`:

    /*eslint angular/no-private-call: [2,{"allow":["$$watchers"]}]*/

    // valid
    $scope.$$watchers.forEach(function (watcher) {
        // ...
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/no-private-call.js)
* [Example source](../examples/no-private-call.js)
