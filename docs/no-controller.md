<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-controller.js', 'examples/no-controller.js'). -->

# no-controller - disallow use of controllers (according to the component first pattern)

According to the Component-First pattern, we should avoid the use of AngularJS controller.

## Examples

The following patterns are considered problems;

    /*eslint angular/no-controller: 2*/

    // invalid
    angular.module('myModule').controller('HelloWorldController', function ($scope) {
        $scope.text = 'Hello World';
    }); // error: Based on the Component-First Pattern, you should avoid the use of controllers

The following patterns are **not** considered problems;

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

## Version

This rule was introduced in eslint-plugin-angular 0.9.0

## Links

* [Rule source](../rules/no-controller.js)
* [Example source](../examples/no-controller.js)
