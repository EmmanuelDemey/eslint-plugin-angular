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

// example - valid: true, options: ["webpack-module-support"]
inject();

// example - valid: true, options: ["webpack-module-support"]
dump();

// example - valid: true, options: ["webpack-module-support"]
angular.mock.module('myModule');

// example - valid: false, options: ["webpack-module-support"], errorMessage: "You should use the \"angular.mock.module\" method directly."
module('myModule');
