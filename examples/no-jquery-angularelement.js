// example - valid: true
angular.element("#id")

// example - valid: false, errorMessage: "angular.element returns already a jQLite element. No need to wrap with the jQuery object"
$(angular.element("#id"))

// example - valid: false, errorMessage: "angular.element returns already a jQLite element. No need to wrap with the jQuery object"
jQuery(angular.element("#id"))
