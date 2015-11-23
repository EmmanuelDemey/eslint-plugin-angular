// example - valid: true
$interval(function() {
    // ...
}, 1000)


// example - valid: false, errorMessage: "You should use the $interval service instead of the default window.setInterval method"
setInterval(function() {
    // ...
}, 1000)


// example - valid: false, errorMessage: "You should use the $interval service instead of the default window.setInterval method"
window.setInterval(function() {
    // ...
}, 1000)

