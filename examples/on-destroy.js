// example - valid: true
$scope.$on('$destroy', function () {
    // ...
});

// example - valid: true
var unregister = $rootScope.$on('$destroy', function () {
    // ...
});

// example - valid: false, errorMessage: "You probably misspelled $on(\"$destroy\")."
$rootScope.$on('destroy', function () {
    // ...
});
