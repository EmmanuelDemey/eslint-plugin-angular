// example - valid: true
angular.module('myModule').factory('myService', function ($http, $log, anotherService) {
   // ...
});

// example - valid: false, errorMessage: "You should use the function syntax for DI"
angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log, anotherService) {
    // ...
}]);

// example - valid: true, options: ["array"]
angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log, anotherService) {
    // ...
}]);

// example - valid: true, options: ["array", {matchNames: true, allowCamelCaseMatch: true}]
angular.module('myModule').factory('myService', ['$http', '$log', 'AnotherService', function ($http, $log, anotherService) {
    // ...
}]);
// example - valid: true, options: ["array", {matchNames: false}]
angular.module('myModule').factory('myService', ['eslintService', function (service) {
    // ...
}]);

// example - valid: true, options: ["$inject"]
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$http', '$log', 'anotherService'];
function myServiceFn($http, $log, anotherService) {
    // ...
}

// example - valid: true, options: ["$inject", {matchNames: true, allowCamelCaseMatch: true}]
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$http', '$log', 'AnotherService'];
function myServiceFn($http, $log, anotherService) {
    // ...
}

// example - valid: true, options: ["$inject", {matchNames: false}]
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['eslintService'];
function myServiceFn(Service) {
    // ...
}

// example - valid: false, options: ["array"], errorMessage: "The signature of the method is incorrect"
angular.module('myModule').factory('myService', ['$http', '$log', 'anotherService', function ($http, $log) {
    // ...
}]);

// example - valid: false, options: ["array"], errorMessage: "You have an error in your DI configuration. Each items of the array should match exactly one function parameter"
angular.module('myModule').factory('myService', ['$http', '$log', function ($log, $http) {
    // ...
}]);

// example - valid: false, options: ["array", {matchNames: true, allowCamelCaseMatch: true}], errorMessage: "You have an error in your DI configuration. Each items of the array should match exactly one function parameter"
angular.module('myModule').factory('myService', ['$http', '$log', 'AnotherService', function ($log, $http, anotherservice) {
    // ...
}]);

// example - valid: false, options: ["array"], errorMessage: "The signature of the method is incorrect"
angular.module('myModule').factory('myService', ['$http', function ($http, $log) {
    // ...
}]);

// example - valid: false, options: ["$inject"], errorMessage: "The signature of the method is incorrect"
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$http', '$log', 'anotherService'];
function myServiceFn($http, $log) {
    // ...
}

// example - valid: false, options: ["$inject"], errorMessage: "The signature of the method is incorrect"
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$http', '$log'];
function myServiceFn($http, $log, anotherService) {
    // ...
}

// example - valid: false, options: ["$inject"], errorMessage: "You have an error in your DI configuration. Each items of the array should match exactly one function parameter"
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$log', '$http'];
function myServiceFn($http, $log) {
    // ...
}

// example - valid: false, options: ["$inject", {matchNames: true, allowCamelCaseMatch: true}], errorMessage: "You have an error in your DI configuration. Each items of the array should match exactly one function parameter"
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$log', '$http', 'AnotherService'];
function myServiceFn($http, $log, 'anotherservice') {
    // ...
}
