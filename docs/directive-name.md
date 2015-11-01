<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/directive-name.js', 'examples/directive-name.js'). -->

# directive-name - require and specify a prefix for all directive names

All your directives should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your directives by "ng" (reserved keyword for AngularJS directives) ("directive-name":  [2, "ng"])

**Styleguide Reference**

* [y073 by johnpapa - Provide a Unique Directive Prefix](https://github.com/johnpapa/angular-styleguide#style-y073)
* [y126 by johnpapa - Directive Component Names](https://github.com/johnpapa/angular-styleguide#style-y126)

## Examples

Examples with the configuration `"prefix"`

    /*eslint angular/directive-name: [2,"prefix"]*/

    // valid
    angular.module('myModule').directive('prefixTabs', function () {
        // ...
    });

Examples with the configuration `"/^ui/"`

    /*eslint angular/directive-name: [2,"/^ui/"]*/

    // valid
    angular.module('myModule').directive('uiNavigation', function () {
        // ...
    });

    // invalid
    angular.module('myModule').directive('navigation', function () {
        // ...
    }); // error: The navigation directive should follow this pattern: /^ui/

Examples with the configuration `"ui"`

    /*eslint angular/directive-name: [2,"ui"]*/

    // invalid
    angular.module('myModule').directive('tabs', function () {
        // ...
    }); // error: The tabs directive should be prefixed by ui

## Links

* [Rule source](../rules/directive-name.js)
* [Example source](../examples/directive-name.js)
