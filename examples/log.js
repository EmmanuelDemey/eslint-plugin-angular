// example - valid: true
$log.log('Hello world!');

// example - valid: true
$log.error('Some error!');

// example - valid: false, errorMessage: "You should use the \"log\" method of the AngularJS Service $log instead of the console object"
console.log('Hello world!');

// example - valid: false, errorMessage: "You should use the \"error\" method of the AngularJS Service $log instead of the console object"
console.error('Some error!');
