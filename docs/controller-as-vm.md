<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-as-vm.js', 'examples/controller-as-vm.js'). -->

# controller-as-vm - require and specify a capture variable for `this` in controllers

You should use a capture variable for 'this' when using the controllerAs syntax.
The second parameter specifies the capture variable you want to use in your application.
The third parameter can be a Regexp for identifying controller functions (when using something like Browserify)

**Styleguide Reference**

* [y032 by johnpapa - controllerAs with vm](https://github.com/johnpapa/angular-styleguide#style-y032)

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/controller-as-vm: 2*/

    // invalid
    angular.module('test').controller('TestController', function() {
        this.test = 'test';
    }); // error: You should not use "this" directly. Instead, assign it to a variable called "vm"

The following patterns are **not** considered problems with default config;

    /*eslint angular/controller-as-vm: 2*/

    // valid
    angular.module('test').controller('TestController', function() {
        var vm = this;
        vm.test = 'test';
    });

The following patterns are considered problems when configured `"viewModel"`:

    /*eslint angular/controller-as-vm: [2,"viewModel"]*/

    // invalid
    angular.module('test').controller('TestController', function() {
        var vm = this;
        vm.test = 'test';
    }); // error: You should assign "this" to a consistent variable across your project: viewModel

The following patterns are **not** considered problems when configured `"viewModel"`:

    /*eslint angular/controller-as-vm: [2,"viewModel"]*/

    // valid
    angular.module('test').controller('TestController', function() {
        var viewModel = this;
        viewModel.test = 'test';
    });

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/controller-as-vm.js)
* [Example source](../examples/controller-as-vm.js)
