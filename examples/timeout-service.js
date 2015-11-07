// example - valid: true
$timeout(function() {
    // ...
}, 1000)


// example - valid: false, errorMessage: "You should use the $timeout service instead of the default window.setTimeout method"
setTimeout(function() {
    // ...
}, 1000)


// example - valid: false, errorMessage: "You should use the $timeout service instead of the default window.setTimeout method"
window.setTimeout(function() {
    // ...
}, 1000)

