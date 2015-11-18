// example - valid: true
angular.element('.some-class');

// example - valid: false, errorMessage: "You should use angular.element instead of the jQuery $ object"
$('.some-class');

// example - valid: false, errorMessage: "You should use angular.element instead of the jQuery $ object"
jQuery('.another-class');
