// example - valid: true
$scope.$on('event', function () {
    // ...
});

// example - valid: true
var deregister = $rootScope.$on('event', function () {
    // ...
});

// example - valid: true
function watchLocalVariable(callback) {
    return $rootScope.$watch(function() {
        return watchLocalVariable;
    }, callback);
}

// example - valid: true
var deregisterFns = [
    $rootScope.$on('event', eventHandler),
    $rootScope.$watch('expression', watcherHandler)
];

// example - valid: true
deregisterFns.push($rootScope.$on('event', function() {
    // ...
}));

// example - valid: false, errorMessage: "The deregistration function returned by \"$on\" call call should not be ignored"
$rootScope.$on('event', function () {
    // ...
});
