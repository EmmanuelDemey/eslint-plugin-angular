// example - valid: true, options: ["prefix"]
angular.module('myModule').value('prefixValue', function () {
    // ...
});

// example - valid: true, options: ["/^xyz/"]
angular.module('myModule').value('xyzValue', function () {
    // ...
});

// example - valid: false, options: ["xyz"], errorMessage: "The myValue value should be prefixed by xyz"
angular.module('myModule').value('myValue', function () {
    // ...
});

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherValue value should follow this pattern\: /^xyz/"
angular.module('myModule').value('otherValue', function () {
    // ...
});
