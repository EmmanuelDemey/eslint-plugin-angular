// example - valid: true, options: ["anonymous"]
angular.module('myModule').factory('myService', function () {
    // ...
});

// example - valid: true, options: ["named"]
angular.module('myModule').factory('myService', function myService() {
    // ...
});

// example - valid: true, options: ["named"]
angular.module('myModule').factory('myService', myServiceFn);
function myServiceFn() {
    // ...
}


// example - valid: false, options: ["named"], errorMessage: "Use named functions instead of anonymous function"
angular.module('myModule').factory('myService', function () {
    // ...
});

// example - valid: false, options: ["anonymous"], errorMessage: "Use anonymous functions instead of named function"
angular.module('myModule').factory('myService', myServiceFn);
function myServiceFn() {
    // ...
}
