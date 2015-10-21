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
    angular.module("myModule", []);

    // valid with filename: someFilter.js
    app.filter("someFilter", function() {});

    // valid with filename: SomeController.js
    app.controller("SomeController", function() {});

    // valid with filename: myUtils.js
    app.service("myUtils", function() {});

    // valid with filename: myUtils.js
    app.factory("myUtils", function() {});

    // valid with filename: beautifulDirective.js
    app.directive("beautifulDirective", function() {});

    // valid with filename: src/app/myApp.module.js
    $provide.value("accountsService", accountsService);

    // valid with filename: src/app/fooBar.spec.js
    it("myApp", function() {})

    // valid with filename: src/app/myService.spec.js
    $httpBackend.expectGET("/api/my/service").respond(200, dummyVorversicherer)

    // invalid with filename: src/app/filters.js
    app.filter("myFilter", function() {}); // error: Filename must be "myFilter.js"

Examples with the configuration `{"typeSeparator":"dot"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot"}]*/

    // valid with filename: src/app/myFilter.filter.js
    app.filter("myFilter", function() {});

    // invalid with filename: src/app/myFilter.js
    app.filter("myFilter", function() {}); // error: Filename must be "myFilter.filter.js"

    // invalid with filename: src/app/Avengers.controller.js
    app.controller("AvengersController", function() {}); // error: Filename must be "AvengersController.controller.js"

Examples with the configuration `{"typeSeparator":"dash"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dash"}]*/

    // valid with filename: src/app/someUtil-service.js
    app.factory("someUtil", function() {});

Examples with the configuration `{"typeSeparator":"underscore"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore"}]*/

    // valid with filename: src/app/SomeController_controller.js
    app.controller("SomeController", function() {});

    // invalid with filename: src/someService_controller.js
    app.factory("someService", function() {}); // error: Filename must be "someService_service.js"

Examples with the configuration `{"typeSeparator":"dot","ignoreTypeSuffix":true}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignoreTypeSuffix":true}]*/

    // valid with filename: src/app/Avengers.controller.js
    app.controller("AvengersController", function() {});

    // valid with filename: src/app/Avengers.controller.js
    app.controller("AvengersController", function() {});

    // valid with filename: src/app/avengers.service.js
    app.factory("avengersService", function() {});

    // valid with filename: src/app/avengersApi.service.js
    app.factory("avengersApi", function() {});

    // valid with filename: src/app/utils.service.js
    app.factory("utils", function() {});

    // invalid with filename: src/app/AvengersController.controller.js
    app.controller("AvengersController", function() {}); // error: Filename must be "Avengers.controller.js"

Examples with the configuration `{"typeSeparator":"dash","nameStyle":"dash"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dash","nameStyle":"dash"}]*/

    // valid with filename: src/app/app-utils-service.js
    app.factory("appUtils", function() {});

Examples with the configuration `{"typeSeparator":"dot","nameStyle":"underscore"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","nameStyle":"underscore"}]*/

    // valid with filename: src/app/my_tab.directive.js
    app.directive("myTab", function() {});

Examples with the configuration `{"typeSeparator":"dot","ignoreTypeSuffix":true,"ignorePrefix":"xp"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","ignoreTypeSuffix":true,"ignorePrefix":"xp"}]*/

    // valid with filename: src/app/asset.service.js
    angular.factory("xpAssetService", xpAssetService)

    // invalid with filename: src/app/xpAsset.service.js
    angular.factory("xpAssetService", xpAssetService) // error: Filename must be "asset.service.js"

Examples with the configuration `{"typeSeparator":"dash","ignorePrefix":"st"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dash","ignorePrefix":"st"}]*/

    // valid with filename: src/app/appUtils-service.js
    angular.factory("stAppUtils", stAppUtils)

Examples with the configuration `{"typeSeparator":"underscore","ignorePrefix":"st"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"underscore","ignorePrefix":"st"}]*/

    // valid with filename: staging_service.js
    angular.factory("staging", staging)

Examples with the configuration `{"typeSeparator":"dot","nameStyle":"dash"}`

    /*eslint angular/file-name: [2,{"typeSeparator":"dot","nameStyle":"dash"}]*/

    // invalid with filename: src/app/avangerProfile.directive.js
    app.directive("avangerProfile", function() {}); // error: Filename must be "avanger-profile.directive.js"
