// example - valid: true
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<div>{{ text }}',
        controller: function ($scope) {
            $scope.text = 'Hello World';
        }
    };
});

// example - valid: false, errorMessage: "Based on the Component-First Pattern, you should avoid the use of controllers"
angular.module('myModule').controller('HelloWorldController', function ($scope) {
    $scope.text = 'Hello World';
});
