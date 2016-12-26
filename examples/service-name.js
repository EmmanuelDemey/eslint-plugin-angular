// example - valid: true, options: ["prefix", {oldBehavior: false}]
angular.module('myModule').service('prefixService', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/", {oldBehavior: false}]
angular.module('myModule').service('xyzService', function () {
    // ...
});

// example - valid: false, options: ["xyz", {oldBehavior: false}], errorMessage: "The myService service should be prefixed by xyz"
angular.module('myModule').service('myService', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/", {oldBehavior: false}], errorMessage: "The otherService service should follow this pattern\: /^xyz/"
angular.module('myModule').service('otherService', function () {
    // ...
});

