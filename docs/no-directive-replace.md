<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-directive-replace.js', 'examples/no-directive-replace.js'). -->

# no-directive-replace - disallow the deprecated directive replace property

This rule disallows the replace attribute in a directive definition object.
The replace property of a directive definition object is deprecated since angular 1.3 ([latest angular docs](https://docs.angularjs.org/api/ng/service/$compile).

The option `ignoreReplaceFalse` let you ignore directive definitions with replace set to false.

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/no-directive-replace: 2*/

    // invalid
    angular.module('myModule').directive('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>',
            replace: true
        };
    }); // error: Directive definition property replace is deprecated.

    // invalid
    angular.module('myModule').directive('helloWorld', function() {
        var directiveDefinition = {};
        directiveDefinition.templateUrl = 'helloWorld.html';
        directiveDefinition.replace = true;
        return directiveDefinition;
    }); // error: Directive definition property replace is deprecated.

The following patterns are **not** considered problems with default config;

    /*eslint angular/no-directive-replace: 2*/

    // valid
    angular.module('myModule').directive('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>'
        };
    });

The following patterns are **not** considered problems when configured `{"ignoreReplaceFalse":true}`:

    /*eslint angular/no-directive-replace: [2,{"ignoreReplaceFalse":true}]*/

    // valid
    angular.module('myModule').directive('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>',
            replace: false
        };
    });

The following patterns are considered problems when configured `{"ignoreReplaceFalse":false}`:

    /*eslint angular/no-directive-replace: [2,{"ignoreReplaceFalse":false}]*/

    // invalid
    angular.module('myModule').directive('helloWorld', function() {
        return {
            template: '<h2>Hello World!</h2>',
            replace: true
        };
    }); // error: Directive definition property replace is deprecated.

## Version

This rule was introduced in eslint-plugin-angular 0.15.0

## Links

* [Rule source](../rules/no-directive-replace.js)
* [Example source](../examples/no-directive-replace.js)
