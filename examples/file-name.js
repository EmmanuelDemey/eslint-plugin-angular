
// example - valid: true, filename: "myModule.js"
angular.module('myModule', []);

// example - valid: true, filename: "app/SomeController.js"
app.controller('SomeController', function() {});

// example - valid: true, filename: "app/utils/myUtils.js"
app.factory('myUtils', function() {});

// example - valid: true, filename: "src/app/awesomeModule/beautifulDirective.js"
app.directive('beautifulDirective', function() {});

// example - valid: false, filename: "src/app/filters.js", errorMessage: "Filename must be \"usefulFilter.js\""
app.filter('usefulFilter', function() {});


// example - valid: true, options: [{"typeSeparator":"dot"}], filename: "src/app/usefulFilter.filter.js"
app.filter('usefulFilter', function() {});

// example - valid: false, options: [{"typeSeparator":"dot"}], filename: "src/app/Some.controller.js", errorMessage: "Filename must be \"SomeController.controller.js\""
app.controller('SomeController', function() {});


// example - valid: true, options: [{"typeSeparator":"dash"}], filename: "app/utils/myUtils-service.js"
app.factory('myUtils', function() {});

// example - valid: true, options: [{"typeSeparator":"underscore"}], filename: "src/app/awesomeModule/beautifulDirective_directive.js"
app.directive('beautifulDirective', function() {});


// example - valid: true, options: [{"typeSeparator":"dot", "ignoreTypeSuffix": true}], filename: "src/app/useful.filter.js"
app.filter('usefulFilter', function() {});

// example - valid: true, options: [{"typeSeparator":"dot", "ignoreTypeSuffix": true}], filename: "src/app/Some.controller.js"
app.controller('SomeController', function() {});

// example - valid: true, options: [{"typeSeparator":"dash", "ignoreTypeSuffix": true}], filename: "app/utils/myUtils-service.js"
app.factory('myUtils', function() {});

// example - valid: true, options: [{"typeSeparator":"underscore", "ignoreTypeSuffix": true}], filename: "src/app/awesomeModule/beautiful_directive.js"
app.directive('beautifulDirective', function() {});

// example - valid: true, options: [{"typeSeparator":"underscore", "nameStyle": "underscore"}], filename: "src/app/tab_navigation_directive.js"
app.directive('tabNavigation', function() {});

// example - valid: true, options: [{"typeSeparator":"dot", "nameStyle": "dash", "ignoreTypeSuffix": true}], filename: "src/app/user-profile.directive.js"
app.directive('userProfileDirective', function() {});


// example - valid: true, options: [{"typeSeparator":"dot", "ignorePrefix": "ui"}], filename: "src/app/userUtils.service.js"
angular.factory('uiUserUtils', uiUserUtils)

