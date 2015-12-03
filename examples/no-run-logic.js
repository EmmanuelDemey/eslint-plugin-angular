// example - valid: true
angular.module('app').run(function(KITTENS, kittenService, startup) {
    kittenService.prefetchData(KITTENS);
    startup('foo', true, 1);
});

// example - valid: true, options: [{allowParams: false}]
angular.module('app').run(function(kittenService, startup) {
    kittenService.prefetchData();
    startup();
});

// example - valid: false, errorMessage: "The run function may only contain call expressions"
angular.module('app').run(function($window) {
    $window.addEventListener('deviceready', deviceready);

    function deviceready() {}
});

// example - valid: false, options: [{allowParams: false}], errorMessage: "Run function call expressions may not take any arguments"
angular.module('app').run(function(startup) {
    startup('foo', true, 1);
});
