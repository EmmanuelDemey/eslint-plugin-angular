// example - valid: true
$q(function() {
    // ...
});

// example - valid: false, errorMessage: "You should not create a new promise with this syntax. Use the $q(function(resolve, reject) {}) syntax."
var deferred = $q.defer();

// example - valid: false, errorMessage: "You should not create a new promise with this syntax. Use the $q(function(resolve, reject) {}) syntax."
var deferred = _$q_.defer();
