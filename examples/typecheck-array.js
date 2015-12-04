// example - valid: true
angular.isArray(someArray);

// example - valid: false, errorMessage: "You should use the angular.isArray method"
Object.prototype.toString.call(someArray) === '[object Array]';

// example - valid: false, errorMessage: "You should use the angular.isArray method"
Array.isArray(someArray)
