// example - valid: true
angular.isUndefined(value)

// example - valid: true
angular.isDefined(value)

// example - valid: false, errorMessage: "You should not use directly the \"undefined\" keyword. Prefer angular.isUndefined or angular.isDefined"
value === undefined

// example - valid: false, errorMessage: "You should not use directly the \"undefined\" keyword. Prefer angular.isUndefined or angular.isDefined"
value !== undefined


// example - valid: false, errorMessage: "Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method"
!angular.isUndefined(value)

// example - valid: false, errorMessage: "Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method"
!angular.isDefined(value)

