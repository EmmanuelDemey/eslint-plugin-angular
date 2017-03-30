// example - valid: true
$scope.$apply();

// example - valid: false, errorMessage: "The apply method should be replaced by $apply, or you should rename it in order to avoid confusions"
$scope.apply.forEach(function (watcher) {
    // ...
});

// example - valid: true
$rootScope.$apply();

// example - valid: false, errorMessage: "The apply method should be replaced by $apply, or you should rename it in order to avoid confusions"
$rootScope.apply.forEach(function (watcher) {
    // ...
});