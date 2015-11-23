// example - valid: true
angular.module('myModule').controller('MyController', function ($log) {
    $log.log('Hello World!');
});

// example - valid: false, errorMessage: "The EmptyController controller is useless because empty. You can remove it from your Router configuration or in one of your view"
angular.module('myModule').controller('EmptyController', function () {
});
