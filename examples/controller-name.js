// example - valid: true
angular.module('myModule').controller('MyController', function () {
   // ...
});

// example - valid: false, errorMessage: "The MyCtrl controller should follow this pattern\: /[A-Z].*Controller$/"
angular.module('myModule').controller('MyCtrl', function () {
    // ...
});

// example - valid: true, options: ["ui"]
angular.module('myModule').controller('uiTabsController', function () {
    // ...
});

// example - valid: false, options: ["ui"], errorMessage: "The TabsController controller should be prefixed by ui"
angular.module('myModule').controller('TabsController', function () {
    // ...
});


// example - valid: true, options: ["/[A-Z].*Ctrl/"]
angular.module('myModule').controller('MyCtrl', function () {
    // ...
});

// example - valid: false, options: ["/[A-Z].*Ctrl/"], errorMessage: "The MyController controller should follow this pattern\: /[A-Z].*Ctrl/"
angular.module('myModule').controller('MyController', function () {
    // ...
});
