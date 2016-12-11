<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/component-name.js', 'examples/component-name.js'). -->

# component-name - require and specify a prefix for all component names

All your components should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your components by "ng" (reserved keyword for AngularJS components) ("component-name":  [2, "ng"])

**Rule based on Angular 1.x**

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/component-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').component('prefixTabs', {
        // ...
    });

The following patterns are considered problems when configured `"/^ui/"`:

    /*eslint angular/component-name: [2,"/^ui/"]*/

    // invalid
    angular.module('myModule').component('navigation', {
        // ...
    }); // error: The navigation component should follow this pattern: /^ui/

The following patterns are **not** considered problems when configured `"/^ui/"`:

    /*eslint angular/component-name: [2,"/^ui/"]*/

    // valid
    angular.module('myModule').component('uiNavigation', {
        // ...
    });

The following patterns are considered problems when configured `"ui"`:

    /*eslint angular/component-name: [2,"ui"]*/

    // invalid
    angular.module('myModule').component('tabs', {
        // ...
    }); // error: The tabs component should be prefixed by ui

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/component-name.js)
* [Example source](../examples/component-name.js)
