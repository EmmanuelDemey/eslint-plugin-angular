// example - valid: true
angular.module('myModule', ['app', 'appFilters', 'ngAnimate', 'ngRoute', 'ui.router']);

// example - valid: false, errorMessage: "ngAnimate should be sorted before ngRoute"
angular.module('myModule', ['ngRoute', 'ngAnimate']);

// example - valid: true, options: [{"grouped": true}]
angular.module('myModule', ['ngAnimate', 'ngRoute', 'app', 'appFilters', 'ui.router']);

// example - valid: false, options: [{"grouped": true}], errorMessage: "ngAnimate is a standard module and should be sorted before app"
angular.module('myModule', ['app', 'ngAnimate']);

// example - valid: true, options: [{"grouped":true, "prefix": "app"}]
angular.module('myModule', ['ngAnimate', 'ngRoute', 'ui.router', 'app', 'appFilters']);

// example - valid: false, options: [{"grouped":true, "prefix": "app"}], errorMessage: "ui.router is a third party module and should be sorted before app"
angular.module('myModule', ['ngRoute', 'app', 'ui.router']);
