# controller-as - disallow assignments to `$scope` in controllers

You should not set properties on $scope in controllers.
Use controllerAs syntax and add data to 'this'.
Implements 'this' check part of [Y031](https://github.com/johnpapa/angular-styleguide#style-y031).
The second parameter can be a Regexp for identifying controller functions (when using something like Browserify)

## Examples

Examples with default configuration

    /*eslint angular/controller-as: 2*/

    // valid
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

    // invalid
    angular.module("myModule").controller("SomeController", function($scope) {
        $scope.value = 42;
    }); // error: You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"
