// example - valid: true
angular.module('myModule').factory('myService', function ($log, anotherService) {
    $log.log(anotherService.getSomeData());
});

// example - valid: false, errorMessage: "Unused injected value $q"
angular.module('myModule').factory('myService', function ($http, $q, $log) {
    $http.get('/api/someData').then(function (response) {
        $log.log(response.data);
    });
});
