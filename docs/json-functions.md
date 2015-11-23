<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/json-functions.js', 'examples/json-functions.js'). -->

# json-functions - enforce use of`angular.fromJson` and 'angular.toJson'

You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify

## Examples

The following patterns are considered problems;

    /*eslint angular/json-functions: 2*/

    // invalid
    JSON.stringify({
        // ...
    }); // error: You should use the angular.toJson method instead of JSON.stringify

    // invalid
    var data = JSON.parse('{"message": "Hello World!"}'); // error: You should use the angular.fromJson method instead of JSON.parse

The following patterns are **not** considered problems;

    /*eslint angular/json-functions: 2*/

    // valid
    angular.toJson({
        // ...
    });

    // valid
    var data = angular.fromJson('{"message": "Hello World!"}');

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/json-functions.js)
* [Example source](../examples/json-functions.js)
