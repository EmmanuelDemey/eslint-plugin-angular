<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-controller.js', 'examples/no-controller.js'). -->

# no-controller - disallow use of controllers (according to the component first pattern)

According to the Component-First pattern, we should avoid the use of AngularJS controller.

## Examples

Examples with default configuration

    /*eslint angular/no-controller: 2*/

    // valid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<div>{{ text }}',
            controller: function ($scope) {
                $scope.text = 'Hello World';
            }
        };
    });

    // invalid
    angular.module('myModule').controller('HelloWorldController', function ($scope) {
        $scope.text = 'Hello World';
    }); // error: Based on the Component-First Pattern, you should avoid the use of controllers

## Links

* [Rule source](../rules/no-controller.js)
* [Example source](../examples/no-controller.js)
