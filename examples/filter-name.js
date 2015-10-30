// example - valid: true, options: ["prefix"]
angular.module('myModule').filter('prefixFilter', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').filter('xyzFilter', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The someFilter filter should be prefixed by xyz"
angular.module('myModule').filter('someFilter', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherFilter filter should follow this pattern\: /^xyz/"
angular.module('myModule').filter('otherFilter', function () {
    // ...
});

