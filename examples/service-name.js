// example - valid: true, options: ["prefix"]
angular.module('myModule').factory('prefixService', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').factory('xyzService', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The myService service should be prefixed by xyz"
angular.module('myModule').factory('myService', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherService service should follow this pattern\: /^xyz/"
angular.module('myModule').factory('otherService', function () {
    // ...
});

