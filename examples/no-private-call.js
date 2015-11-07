// example - valid: true
$scope.$apply();

// example - valid: false, errorMessage: "Using $$-prefixed Angular objects/methods are not recommended"
$scope.$$watchers.forEach(function (watcher) {
    // ...
});

// example - valid: true, options: [{"allow":["$$watchers"]}]
$scope.$$watchers.forEach(function (watcher) {
    // ...
});

// example - valid: false, options: [{"allow":["$$watchers"]}], errorMessage: "Using $$-prefixed Angular objects/methods are not recommended"
$scope.$$listeners.forEach(function (listener) {
    // ...
});
