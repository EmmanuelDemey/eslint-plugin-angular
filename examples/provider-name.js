// example - valid: true, options: ["prefix"]
angular.module('myModule').provider('prefixProvider', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').provider('xyzProvider', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The myProvider provider should be prefixed by xyz"
angular.module('myModule').provider('myProvider', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherProvider provider should follow this pattern\: /^xyz/"
angular.module('myModule').provider('otherProvider', function () {
    // ...
});
