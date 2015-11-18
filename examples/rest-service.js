// example - valid: true, options: ["$http"]
angular.module('myModule').service('myService', function($http) {
    // ...
});

// example - valid: false, options: ["$http"], errorMessage: "You should use the same service ($http) for REST API calls"
angular.module('myModule').service('myService', function($resource) {
    // ...
});

// example - valid: true, options: ["$resource"]
angular.module('myModule').service('myService', function($resource) {
    // ...
});

// example - valid: false, options: ["$resource"], errorMessage: "You should use the same service ($resource) for REST API calls"
angular.module('myModule').service('myService', function($http) {
    // ...
});

// example - valid: true, options: ["Restangular"]
angular.module('myModule').service('myService', function(Restangular) {
    // ...
});

// example - valid: false, options: ["Restangular"], errorMessage: "You should use the same service (Restangular) for REST API calls"
angular.module('myModule').service('myService', function($http) {
    // ...
});
