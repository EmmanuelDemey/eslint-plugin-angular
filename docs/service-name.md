<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/service-name.js', 'examples/service-name.js'). -->

# service-name - require and specify a prefix for all service names

All your services should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your services by "$" (reserved keyword for AngularJS services) ("service-name":  [2, "ng"])
*

**Rule based on Angular 1.x**

**Styleguide Reference**

* [y125 by johnpapa - Naming - Factory and Service Names](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y125)

## Examples

The following patterns are **not** considered problems when configured `"prefix"` and `{"oldBehavior":false}`:

    /*eslint angular/service-name: [2,"prefix",{"oldBehavior":false}]*/

    // valid
    angular.module('myModule').service('prefixService', function () {
        // ...
    });

The following patterns are considered problems when configured `"/^xyz/"` and `{"oldBehavior":false}`:

    /*eslint angular/service-name: [2,"/^xyz/",{"oldBehavior":false}]*/

    // invalid
    angular.module('myModule').service('otherService', function () {
        // ...
    }); // error: The otherService service should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"` and `{"oldBehavior":false}`:

    /*eslint angular/service-name: [2,"/^xyz/",{"oldBehavior":false}]*/

    // valid
    angular.module('myModule').service('xyzService', function () {
        // ...
    });

The following patterns are considered problems when configured `"xyz"` and `{"oldBehavior":false}`:

    /*eslint angular/service-name: [2,"xyz",{"oldBehavior":false}]*/

    // invalid
    angular.module('myModule').service('myService', function () {
        // ...
    }); // error: The myService service should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/service-name.js)
* [Example source](../examples/service-name.js)
