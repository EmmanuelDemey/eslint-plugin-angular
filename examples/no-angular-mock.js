// example - valid: true
dump($scope);

// example - valid: true
inject(function (someService) {
    // ...
});

// example - valid: true
module('myModule');

// example - valid: false, errorMessage: "You should use the \"dump\" method available in the window object."
angular.mock.dump($scope);

// example - valid: false, errorMessage: "You should use the \"inject\" method available in the window object."
angular.mock.inject(function (someService) {
    // ...
});

// example - valid: false, errorMessage: "You should use the \"module\" method available in the window object."
angular.mock.module('myModule');
