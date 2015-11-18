// example - valid: true
$routeProvider.when('/myroute', {
    controller: 'MyController',
    controllerAs: 'vm'
});

// example - valid: false, errorMessage: "Route \"/myroute\" should use controllerAs syntax"
$routeProvider.when('/myroute', {
    controller: 'MyController'
})

