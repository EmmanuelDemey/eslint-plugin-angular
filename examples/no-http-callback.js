// example - valid: true
$http.get('api/data').then(function onSuccess() {
    // ...
}, function onReject() {
   // ...
});

// example - valid: false, errorMessage: "$http success is deprecated. Use then instead"
$http.get('api/data').success(function onSuccess() {
    // ...
});

// example - valid: false, errorMessage: "$http error is deprecated. Use then or catch instead"
$http.get('api/data').error(function onReject() {
    // ...
});
