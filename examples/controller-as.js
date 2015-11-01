// example - valid: true
angular.module("myModule").controller("SomeController", function($scope) {
    // this for values
    this.value = 42;

    // $scope is fine for watchers
    $scope.$watch(angular.bind(this, function () {
        return this.value
    }), function () {
        // ...
    });
});

// example - valid: false, errorMessage: "You should not set properties on $scope in controllers. Use controllerAs syntax and add data to \"this\""
angular.module("myModule").controller("SomeController", function($scope) {
    $scope.value = 42;
});
