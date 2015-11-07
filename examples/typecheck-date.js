// example - valid: true
angular.isDate(someDate);

// example - valid: false, errorMessage: "You should use the angular.isDate method"
Object.prototype.toString.call(someDate) === '[object Date]';
