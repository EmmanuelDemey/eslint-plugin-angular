// example - valid: true
angular.module('myModule').factory('myService', function () {
    // ...
});

// example - valid: true
angular.module('myModule').value('someValue', {
    // ...
});

// example - valid: false, errorMessage: "You should prefer the factory() method instead of service()"
angular.module('myModule').service('myService', function() {
    // ...
});
