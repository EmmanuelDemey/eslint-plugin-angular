# file-name - require and specify a consistent component name pattern

All your file names should match the angular component name.
The second parameter can be a config object [2, {nameStyle: 'dash', typeSeparator: 'dot', ignoreTypeSuffix: true, ignorePrefix: 'ui'}] to match 'avenger-profile.directive.js' or 'avanger-api.service.js'.
Possible values for 'typeSeparator' and 'nameStyle' are 'dot', 'dash' and 'underscore'.
The options 'ignoreTypeSuffix' ignores camel cased suffixes like 'someController' or 'myService' and 'ignorePrefix' ignores namespace prefixes like 'ui'.
[Y120](https://github.com/johnpapa/angular-styleguide#style-y120) [Y121](https://github.com/johnpapa/angular-styleguide#style-y121)

## Examples

Examples with default configuration

    /*eslint angular/file-name: 2*/

    // valid with filename: myModule.js
    angular.module('myModule', []);

    // valid with filename: app/SomeController.js
    app.controller('SomeController', function() {});

    // valid with filename: app/utils/myUtils.js
    app.factory('myUtils', function() {});

    // valid with filename: src/app/awesomeModule/beautifulDirective.js
    app.directive('beautifulDirective', function() {});

    // invalid with filename: src/app/filters.js
    app.filter('usefulFilter', function() {}); // error: Filename must be "usefulFilter.js"

Examples with the configuration `{"typeSeparator":"dot"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot"}]*/

    // valid with filename: src/app/usefulFilter.filter.js
    app.filter('usefulFilter', function() {});

    // invalid with filename: src/app/Some.controller.js
    app.controller('SomeController', function() {}); // error: Filename must be "SomeController.controller.js"

Examples with the configuration `{"typeSeparator":"dash"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dash"}]*/

    // valid with filename: app/utils/myUtils-service.js
    app.factory('myUtils', function() {});

Examples with the configuration `{"typeSeparator":"underscore"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore"}]*/

    // valid with filename: src/app/awesomeModule/beautifulDirective_directive.js
    app.directive('beautifulDirective', function() {});

Examples with the configuration `{"typeSeparator":"dot","ignoreTypeSuffix":true}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/useful.filter.js
    app.filter('usefulFilter', function() {});

    // valid with filename: src/app/Some.controller.js
    app.controller('SomeController', function() {});

Examples with the configuration `{"typeSeparator":"dash","ignoreTypeSuffix":true}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dash","ignoreTypeSuffix":true}]*/

    // valid with filename: app/utils/myUtils-service.js
    app.factory('myUtils', function() {});

Examples with the configuration `{"typeSeparator":"underscore","ignoreTypeSuffix":true}`

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/awesomeModule/beautiful_directive.js
    app.directive('beautifulDirective', function() {});

Examples with the configuration `{"typeSeparator":"underscore","nameStyle":"underscore"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore","nameStyle":"underscore"}]*/

    // valid with filename: src/app/tab_navigation_directive.js
    app.directive('tabNavigation', function() {});

Examples with the configuration `{"typeSeparator":"dot","nameStyle":"dash","ignoreTypeSuffix":true}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","nameStyle":"dash","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/user-profile.directive.js
    app.directive('userProfileDirective', function() {});

Examples with the configuration `{"typeSeparator":"dot","ignorePrefix":"ui"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignorePrefix":"ui"}]*/

    // valid with filename: src/app/userUtils.service.js
    angular.factory('uiUserUtils', uiUserUtils)

<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/file-name.js', 'examples/file-name.js'). -->
