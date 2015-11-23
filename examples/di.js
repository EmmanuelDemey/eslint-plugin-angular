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

// example - valid: true, options: ["$inject"]
angular.module('myModule').factory('myService', myServiceFn);
myServiceFn.$inject=['$http', '$log', 'anotherService'];
function myServiceFn($http, $log, anotherService) {
    // ...
}
