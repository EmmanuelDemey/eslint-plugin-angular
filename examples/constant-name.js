// example - valid: true, options: ["prefix"]
angular.module('myModule').constant('prefixConstant', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').constant('xyzConstant', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The myConstant constant should be prefixed by xyz"
angular.module('myModule').constant('myConstant', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherConstant constant should follow this pattern\: /^xyz/"
angular.module('myModule').constant('otherConstant', function () {
    // ...
});
