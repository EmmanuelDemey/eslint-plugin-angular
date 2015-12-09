<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-directive.js', 'examples/no-directive.js'). -->

# no-directive -

Since AngularJS 1.5, we can use a new API when creating directives. This API will help the migration to the next version of the framework

## Examples

The following patterns are considered problems;

    /*eslint angular/no-directive: 2*/

    // invalid
    angular.module('myModule').directive('helloWorld', function() {
    }); // error: Directive should be implemented with the component method

The following patterns are **not** considered problems;

    /*eslint angular/no-directive: 2*/

    // valid
    angular.module('myModule').component('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>'
        };
    });

## Version

This rule was introduced in eslint-plugin-angular 0.16.0

## Links

* [Rule source](../rules/no-directive.js)
* [Example source](../examples/no-directive.js)
