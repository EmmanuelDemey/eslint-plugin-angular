// example - valid: true
angular.module('myModule').directive('helloWorld', function () {
    return {
        templateUrl: 'template/helloWorld.html'
    };
});

// example - valid: true
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<div>Hello World</div>' // simple templates are allowed by default
    };
});

// example - valid: true
angular.module('myModule').config(function ($routeProvider) {
    $routeProvider.when('/hello', {
        template: '<hello-world></hello-world>' // directives for routing
    });
});

// example - valid: false, errorMessage: "Inline template is too complex. Use an external template instead"
angular.module('myModule').directive('helloWorld', function () {
    return {
        template: '<div>Hello World! <button>Say hello!</button></div>'
    };
});

// example - valid: true, options: [{"allowSimple": true}]
angular.module('myModule').config(function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        template: '<dashboard></dashboard>' // directives for routing
    });
});

// example - valid: false, options: [{"allowSimple": true}], errorMessage: "Inline template is too complex. Use an external template instead"
angular.module('myModule').config(function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        template: '<div><h1>Dashboard</h1><dashboard></dashboard></div>'
    });
});

// example - valid: true, options: [{"allowSimple": false}]
angular.module('myModule').config(function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard.html'
    });
});

// example - valid: false, options: [{"allowSimple": false}], errorMessage: "Inline templates are not allowed. Use an external template instead"
angular.module('myModule').config(function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        template: '<dashboard></dashboard>'
    });
});
