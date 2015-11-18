// example - valid: true
angular.toJson({
    // ...
});

// example - valid: true
var data = angular.fromJson('{"message": "Hello World!"}');

// example - valid: false, errorMessage: "You should use the angular.toJson method instead of JSON.stringify"
JSON.stringify({
    // ...
});

// example - valid: false, errorMessage: "You should use the angular.fromJson method instead of JSON.parse"
var data = JSON.parse('{"message": "Hello World!"}');
