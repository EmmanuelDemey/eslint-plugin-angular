<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-name.js', 'examples/module-name.js'). -->

# module-name - require and specify a prefix for all module names

When you create a new module, its name should start with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("module-name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angular-styleguide#style-y127)

## Examples

Examples with the configuration `"prefix"`

    /*eslint angular/module-name: [2,"prefix"]*/

    // valid
    angular.module('prefixModule', []);

Examples with the configuration `"/^xyz/"`

    /*eslint angular/module-name: [2,"/^xyz/"]*/

    // valid
    angular.module('xyzModule', []);

    // invalid
    angular.module('otherModule', []); // error: The otherModule module should follow this pattern: /^xyz/

Examples with the configuration `"xyz"`

    /*eslint angular/module-name: [2,"xyz"]*/

    // invalid
    angular.module('myModule', []); // error: The myModule module should be prefixed by xyz

## Links

* [Rule source](../rules/module-name.js)
* [Example source](../examples/module-name.js)
