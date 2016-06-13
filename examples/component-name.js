// example - valid: true, options: ["prefix"]
angular.module('myModule').component('prefixTabs', function () {
    // ...
});

// example - valid: true, options: ["/^ui/"]
angular.module('myModule').component('uiNavigation', function () {
    // ...
});

// example - valid: false, options: ["ui"], errorMessage: "The tabs component should be prefixed by ui"
angular.module('myModule').component('tabs', function () {
    // ...
});

// example - valid: false, options: ["/^ui/"], errorMessage: "The navigation component should follow this pattern\: /^ui/"
angular.module('myModule').component('navigation', function () {
    // ...
});
