<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-service-method.js', 'examples/no-service-method.js'). -->

# no-service-method - use `factory()` instead of `service()`

You should prefer the factory() method instead of service()

**Styleguide Reference**

* [y040 by johnpapa - Services - Singletons](https://github.com/johnpapa/angular-styleguide#style-y040)

## Examples

Examples with default configuration

    /*eslint angular/no-service-method: 2*/

    // valid
    angular.module('myModule').factory('myService', function () {
        // ...
    });

    // valid
    angular.module('myModule').value('someValue', {
        // ...
    });

    // invalid
    angular.module('myModule').service('myService', function() {
        // ...
    }); // error: You should prefer the factory() method instead of service()

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/no-service-method.js)
* [Example source](../examples/no-service-method.js)
