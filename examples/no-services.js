// example - valid: true
app.controller('MyController', function(myService) {
    // ...
});

// example - valid: false, errorMessage: "REST API calls should be implemented in a specific service ($http in controller)"
app.controller('MyController', function($http) {
    // ...
});

// example - valid: false, errorMessage: "REST API calls should be implemented in a specific service ($resource in directive)"
app.directive('helloWorld', function($resource) {
    // ...
});

// example - valid: true, options: [["$http","$q"]]
app.directive('helloWorld', function($resource) {
    // ...
});

// example - valid: false, options: [["$http","$q"]], errorMessage: "REST API calls should be implemented in a specific service ($q in directive)"
app.directive('helloWorld', function($q) {
    // ...
});

// example - valid: true, options: [["$http","$q"],["directive"]]
app.controller('MyController', function($http) {
    // ...
});

// example - valid: false, options: [["$http","$q"],["directive"]], errorMessage: "REST API calls should be implemented in a specific service ($http in directive)"
app.directive('MyController', function($http) {
    // ...
});


// example - valid: true, options: [{"directive":["$http","$q"],"controller":["$resource"]}]
app.controller('MyController', function($http, $q, $log) {
    // ...
});

// example - valid: true, options: [{"directive":["$http","$q"],"controller":["$resource"]}]
app.directive('helloWorld', function($resource, $log) {
    // ...
});

// example - valid: false, options: [{"directive":["$http","$q"],"controller":["$resource"]}], errorMessage: "REST API calls should be implemented in a specific service ($resource in controller)"
app.controller('MyController', function($resource, $log) {
    // ...
});

// example - valid: false, options: [{"directive":["$http","$q"],"controller":["$resource"]}], errorMessage: "REST API calls should be implemented in a specific service ($http in directive)"
app.directive('helloWorld', function($http, $log) {
    // ...
});
