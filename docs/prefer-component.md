<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/prefer-component.js', 'examples/prefer-component.js'). -->

# prefer-component -

Since AngularJS 1.5, we can use a new API when creating directives.
This new API should be use when creating directive without DOM manipulation.

**Rule based on Angular 1.5**

## Examples

The following patterns are considered problems;

    /*eslint angular/prefer-component: 2*/

    // invalid
    angular.module('myModule').directive('helloWorld', function() {
        return {

        }
    }); // error: Directive should be implemented with the component method.

The following patterns are **not** considered problems;

    /*eslint angular/prefer-component: 2*/

    // valid
    angular.module('myModule').component('helloWorld', {
        template: '<h2>Hello World!</h2>'
    });

    // valid
    angular.module('myModule').directive('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>',
            link: function(){

            }
        };
    });

## Version

This rule was introduced in eslint-plugin-angular 0.16.0

## Links

* [Rule source](../rules/prefer-component.js)
* [Example source](../examples/prefer-component.js)
