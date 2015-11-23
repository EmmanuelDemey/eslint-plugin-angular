<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/one-dependency-per-line.js', 'examples/one-dependency-per-line.js'). -->

# one-dependency-per-line - require all DI parameters to be located in their own line

Injected dependencies should be written one per line.

## Examples

The following patterns are considered problems;

    /*eslint angular/one-dependency-per-line: 2*/

    // invalid
    app.controller('MyController', MyController);

    function MyController($http, $q) {} // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', function($http, $q) {}); // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', ['$http','$q',
        function($http,
                 $q) {
        }]); // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', [
        '$http',
        '$q',
        function($http, $q) {}]); // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', ['$http', '$q', MyController]);

    function MyController($http,
                          $q) {} // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', [
        '$http',
        '$q',
        MyController]);

    function MyController($http, $q) {} // error: Do not use multiple dependencies in one line

    // invalid
    app.controller('MyController', ['$http', '$q', function($http, $q) {}]);
    // error: Do not use multiple dependencies in one line, Do not use multiple dependencies in one line

The following patterns are **not** considered problems;

    /*eslint angular/one-dependency-per-line: 2*/

    // valid
    app.controller('MyController', MyController);

    function MyController($http,
                          $q) {
    }

    // valid
    app.controller('MyController', function($http,
                                            $q) {
        });

    // valid
    app.controller('MyController', [
        '$http',
        '$q',
        function($http,
                 $q) {
        }]);

    // valid
    app.controller('MyController', [
        '$http',
        '$q',
        MyController]);

    function MyController($http,
                          $q) {
    }

## Version

This rule was introduced in eslint-plugin-angular 0.14.0

## Links

* [Rule source](../rules/one-dependency-per-line.js)
* [Example source](../examples/one-dependency-per-line.js)
