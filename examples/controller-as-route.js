// example - valid: true
$routeProvider.when('/myroute', {
    controller: 'MyController',
    controllerAs: 'vm'
});

// example - valid: true
$routeProvider.when('/myroute', {
    controller: 'MyController as vm'
});

// example - valid: false, errorMessage: "Route \"/myroute\" should use controllerAs syntax"
$routeProvider.when('/myroute', {
    controller: 'MyController'
})

// example - valid: false, errorMessage: "The controllerAs syntax is defined twice for the route \"/myroute\""
$routeProvider.when('/myroute', {
    controller: 'MyController as vm',
    controllerAs: 'vm'
})
