// example - valid: true, options: ["$apply"]
$scope.$apply(function() {
    // ...
});

// example - valid: false, options: ["$apply"], errorMessage: "Instead of using the $digest() method, you should prefer $apply()"
$scope.$digest();

// example - valid: true, options: ["$digest"]
$scope.$digest();


// example - valid: false, options: ["$digest"], errorMessage: "Instead of using the $apply() method, you should prefer $digest()"
$scope.$apply(function() {
    // ...
});
