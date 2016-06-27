// example - valid: true
angular.module('myModule').factory('myService', function($http, $location, $q, myService, someService) {
    // ...
});

// example - valid: true
beforeEach(inject(function (_$compile_, $httpBackend, _$log_, _$rootScope_) {
    // ...
}));

// example - valid: true
angular.module('myModule').factory('myService', function(CONFIG, URLs, authService, zero) {
    // ...
});

// example - valid: true, options: [true, "case_sensitive"]
angular.module("").animation("", function(Authentication, analytics) {
    // ...
});

// example - valid: true, options: [true, "case_insensitive"]
angular.module("").animation("", function(analytics, Authentication) {
    // ...
});

// example - valid: false, errorMessage: "Injected values should be sorted alphabetically"
angular.module('myModule').factory('myService', function($q, $http) {
    // ...
});

// example - valid: false, errorMessage: "Injected values should be sorted alphabetically"
angular.module('myModule').controller('SomeController', function(myService, $http) {
    // ...
});

// example - valid: false, errorMessage: "Injected values should be sorted alphabetically"
angular.module('myModule').filter('myFilter', function(someService, myService) {
    // ...
});

// example - valid: true, options: [true]
beforeEach(inject(function (_$compile_, $httpBackend, _$log_, _$rootScope_) {
    // ...
}));

// example - valid: false, options: [true], errorMessage: "Injected values should be sorted alphabetically"
beforeEach(inject(function ($httpBackend, _$compile_, _$log_, _$rootScope_) {
    // ...
}));

// example - valid: true, options: [false]
beforeEach(inject(function ($httpBackend, _$compile_, _$log_, _$rootScope_) {
    // ...
}));

// example - valid: false, options: [false], errorMessage: "Injected values should be sorted alphabetically"
beforeEach(inject(function (_$compile_, $httpBackend, _$log_, _$rootScope_) {
    // ...
}));

