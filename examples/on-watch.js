// example - valid: true
$scope.$on('event', function () {
    // ...
});

// example - valid: true
var unregister = $rootScope.$on('event', function () {
    // ...
});

// example - valid: false, errorMessage: "The \"$on\" call should be assigned to a variable, in order to be destroyed during the $destroy event"
$rootScope.$on('event', function () {
    // ...
});
