// example - valid: true
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<h2>Hello World!</h2>',
        restrict: 'A' // also allowed: A, E, AE, EA
    };
});

// example - valid: true
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<h2>Hello World!</h2>'
        // no explicit restrict is allowed by default
    };
});


// example - valid: false, options: [{"explicit": "always"}], errorMessage: "Missing directive restriction"
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<h2>Hello World!</h2>'
    };
});


// example - valid: false, options: [{"explicit": "never"}], errorMessage: "No need to explicitly specify a default directive restriction"
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<h2>Hello World!</h2>',
        restrict: 'AE'
    };
});


// example - valid: false, options: [{"restrict": "A"}], errorMessage: "Disallowed directive restriction. It must be one of A in that order"
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<h2>Hello World!</h2>',
        restrict: 'E'
    };
});


