
// example - valid: true, filename: "app.config.js"
angular.module('app').config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

// example - valid: true, filename: "admin.config.js"
angular.module('admin').config(function($routeProvider) {
    $routeProvider.when('/admin', {
        templateUrl: 'admin.html'
    });
});

// example - valid: true, filename: "config.js"
angular.module('myApp').config(function($logProvider) {
    $logProvider.debugEnabled(true);
});

// example - valid: true, filename: "src/modules/users/users.config.js"
angular.module('users').config(function($stateProvider) {
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'users.html'
    });
});

// example - valid: false, filename: "app.js", errorMessage: "Module configuration should be in a separate file with a .config.js suffix"
angular.module('app').config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

// example - valid: false, filename: "app.module.js", errorMessage: "Module configuration should be in a separate file with a .config.js suffix"
angular.module('app').config(function($routeProvider) {
    $routeProvider.otherwise('/home');
});

// example - valid: false, filename: "admin.js", errorMessage: "Module configuration should be in a separate file with a .config.js suffix"
angular.module('admin').config(configFunction);
