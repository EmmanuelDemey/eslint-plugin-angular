<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-as.js', 'examples/controller-as.js'). -->

# controller-as - disallow assignments to `$scope` in controllers

You should not set properties on $scope in controllers.
Use controllerAs syntax and add data to 'this'.
The second parameter can be a Regexp for identifying controller functions (when using something like Browserify)

**Styleguide Reference**

* [y031 by johnpapa - controllerAs Controller Syntax](https://github.com/johnpapa/angular-styleguide#style-y031)

## Examples

The following patterns are considered problems;

    /*eslint angular/controller-as: 2*/

    // invalid
    angular.module("myModule").controller("SomeController", function($scope) {
        $scope.value = 42;
    }); // error: You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"

The following patterns are **not** considered problems;

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

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/controller-as.js)
* [Example source](../examples/controller-as.js)
