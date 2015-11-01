<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/file-name.js', 'examples/file-name.js'). -->

# file-name - require and specify a consistent component name pattern

All your file names should match the angular component name.
The second parameter can be a config object [2, {nameStyle: 'dash', typeSeparator: 'dot', ignoreTypeSuffix: true, ignorePrefix: 'ui'}] to match 'avenger-profile.directive.js' or 'avanger-api.service.js'.
Possible values for 'typeSeparator' and 'nameStyle' are 'dot', 'dash' and 'underscore'.
The options 'ignoreTypeSuffix' ignores camel cased suffixes like 'someController' or 'myService' and 'ignorePrefix' ignores namespace prefixes like 'ui'.

**Styleguide Reference**

* [y120 by johnpapa - Naming - Naming Guidelines](https://github.com/johnpapa/angular-styleguide#style-y120)
* [y121 by johnpapa - Naming - Feature File Names](https://github.com/johnpapa/angular-styleguide#style-y121)

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/file-name: 2*/

    // invalid with filename: src/app/filters.js
    app.filter('usefulFilter', function() {}); // error: Filename must be "usefulFilter.js"

The following patterns are **not** considered problems with default config;

    /*eslint angular/file-name: 2*/

    // valid with filename: myModule.js
    angular.module('myModule', []);

    // valid with filename: app/SomeController.js
    app.controller('SomeController', function() {});

    // valid with filename: app/utils/myUtils.js
    app.factory('myUtils', function() {});

    // valid with filename: src/app/awesomeModule/beautifulDirective.js
    app.directive('beautifulDirective', function() {});

The following patterns are considered problems when configured `{"typeSeparator":"dot"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dot"}]*/

    // invalid with filename: src/app/Some.controller.js
    app.controller('SomeController', function() {}); // error: Filename must be "SomeController.controller.js"

The following patterns are **not** considered problems when configured `{"typeSeparator":"dot"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dot"}]*/

    // valid with filename: src/app/usefulFilter.filter.js
    app.filter('usefulFilter', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"dash"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dash"}]*/

    // valid with filename: app/utils/myUtils-service.js
    app.factory('myUtils', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"underscore"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore"}]*/

    // valid with filename: src/app/awesomeModule/beautifulDirective_directive.js
    app.directive('beautifulDirective', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"dot","ignoreTypeSuffix":true}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/useful.filter.js
    app.filter('usefulFilter', function() {});

    // valid with filename: src/app/Some.controller.js
    app.controller('SomeController', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"dash","ignoreTypeSuffix":true}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dash","ignoreTypeSuffix":true}]*/

    // valid with filename: app/utils/myUtils-service.js
    app.factory('myUtils', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"underscore","ignoreTypeSuffix":true}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/awesomeModule/beautiful_directive.js
    app.directive('beautifulDirective', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"underscore","nameStyle":"underscore"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore","nameStyle":"underscore"}]*/

    // valid with filename: src/app/tab_navigation_directive.js
    app.directive('tabNavigation', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"dot","nameStyle":"dash","ignoreTypeSuffix":true}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","nameStyle":"dash","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/user-profile.directive.js
    app.directive('userProfileDirective', function() {});

The following patterns are **not** considered problems when configured `{"typeSeparator":"dot","ignorePrefix":"ui"}`:

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignorePrefix":"ui"}]*/

    // valid with filename: src/app/userUtils.service.js
    angular.factory('uiUserUtils', uiUserUtils)

## Version

This rule was introduced in eslint-plugin-angular 0.7.0

## Links

* [Rule source](../rules/file-name.js)
* [Example source](../examples/file-name.js)
