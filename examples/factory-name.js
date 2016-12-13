// example - valid: true, options: ["prefix"]
angular.module('myModule').factory('prefixFactory', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').factory('xyzFactory', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The myFactory factory should be prefixed by xyz"
angular.module('myModule').factory('myFactory', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherFactory factory should follow this pattern\: /^xyz/"
angular.module('myModule').factory('otherFactory', function () {
    // ...
});
