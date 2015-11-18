<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-inline-template.js', 'examples/no-inline-template.js'). -->

# no-inline-template - disallow the use of inline templates

Instead of using inline HTML templates, it is better to load the HTML from an external file.
Simple HTML templates are accepted by default.
('no-inline-template': [0, {allowSimple: true}])

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/no-inline-template: 2*/

    // invalid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<div>Hello World! <button>Say hello!</button></div>'
        };
    }); // error: Inline template is too complex. Use an external template instead

The following patterns are **not** considered problems with default config;

    /*eslint angular/no-inline-template: 2*/

    // valid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            templateUrl: 'template/helloWorld.html'
        };
    });

    // valid
    angular.module('myModule').directive('helloWorld', function () {
        return {
            template: '<div>Hello World</div>' // simple templates are allowed by default
        };
    });

    // valid
    angular.module('myModule').config(function ($routeProvider) {
        $routeProvider.when('/hello', {
            template: '<hello-world></hello-world>' // directives for routing
        });
    });

The following patterns are considered problems when configured `{"allowSimple":true}`:

    /*eslint angular/no-inline-template: [2,{"allowSimple":true}]*/

    // invalid
    angular.module('myModule').config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            template: '<div><h1>Dashboard</h1><dashboard></dashboard></div>'
        });
    }); // error: Inline template is too complex. Use an external template instead

The following patterns are **not** considered problems when configured `{"allowSimple":true}`:

    /*eslint angular/no-inline-template: [2,{"allowSimple":true}]*/

    // valid
    angular.module('myModule').config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            template: '<dashboard></dashboard>' // directives for routing
        });
    });

The following patterns are considered problems when configured `{"allowSimple":false}`:

    /*eslint angular/no-inline-template: [2,{"allowSimple":false}]*/

    // invalid
    angular.module('myModule').config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            template: '<dashboard></dashboard>'
        });
    }); // error: Inline templates are not allowed. Use an external template instead

The following patterns are **not** considered problems when configured `{"allowSimple":false}`:

    /*eslint angular/no-inline-template: [2,{"allowSimple":false}]*/

    // valid
    angular.module('myModule').config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/dashboard.html'
        });
    });

## Version

This rule was introduced in eslint-plugin-angular 0.12.0

## Links

* [Rule source](../rules/no-inline-template.js)
* [Example source](../examples/no-inline-template.js)
