<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-name.js', 'examples/module-name.js'). -->

# module-name - require and specify a prefix for all module names

When you create a new module, its name should start with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("module-name":  [2, "ng"])

**Styleguide Reference**

* [y127 by johnpapa - Naming - Modules](https://github.com/johnpapa/angular-styleguide#style-y127)

## Examples

The following patterns are **not** considered problems when configured `"prefix"`:

    /*eslint angular/module-name: [2,"prefix"]*/

    // valid
    angular.module('prefixModule', []);

The following patterns are considered problems when configured `"/^xyz/"`:

    /*eslint angular/module-name: [2,"/^xyz/"]*/

    // invalid
    angular.module('otherModule', []); // error: The otherModule module should follow this pattern: /^xyz/

The following patterns are **not** considered problems when configured `"/^xyz/"`:

    /*eslint angular/module-name: [2,"/^xyz/"]*/

    // valid
    angular.module('xyzModule', []);

The following patterns are considered problems when configured `"xyz"`:

    /*eslint angular/module-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule', []); // error: The myModule module should be prefixed by xyz

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/module-name.js)
* [Example source](../examples/module-name.js)
