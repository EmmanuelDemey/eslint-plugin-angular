// example - valid: true, options: ["prefix"]
angular.module('myModule').directive('prefixTabs', function () {
    // ...
});

// example - valid: true, options: ["/^ui/"]
angular.module('myModule').directive('uiNavigation', function () {
    // ...
});

// example - valid: false, options: ["ui"], errorMessage: "The tabs directive should be prefixed by ui"
angular.module('myModule').directive('tabs', function () {
    // ...
});

// example - valid: false, options: ["/^ui/"], errorMessage: "The navigation directive should follow this pattern\: /^ui/"
angular.module('myModule').directive('navigation', function () {
    // ...
});

