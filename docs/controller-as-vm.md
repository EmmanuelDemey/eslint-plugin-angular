<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-as-vm.js', 'examples/controller-as-vm.js'). -->

# controller-as-vm - require and specify a capture variable for `this` in controllers

You should use a capture variable for 'this' when using the controllerAs syntax.
[Y031](https://github.com/johnpapa/angular-styleguide#style-y032).
The second parameter specifies the capture variable you want to use in your application.
The third parameter can be a Regexp for identifying controller functions (when using something like Browserify)

## Examples

Examples with default configuration

    /*eslint angular/controller-as-vm: 2*/

    // valid
    angular.module('test').controller('TestController', function() {
        var vm = this;
        vm.test = 'test';
    });

    // invalid
    angular.module('test').controller('TestController', function() {
        this.test = 'test';
    }); // error: You should not use "this" directly. Instead, assign it to a variable called "vm"

Examples with the configuration `"viewModel"`

    /*eslint angular/controller-as-vm: [2,"viewModel"]*/

    // valid
    angular.module('test').controller('TestController', function() {
        var viewModel = this;
        viewModel.test = 'test';
    });

    // invalid
    angular.module('test').controller('TestController', function() {
        var vm = this;
        vm.test = 'test';
    }); // error: You should assign "this" to a consistent variable across your project: viewModel

## Links

* [Rule source](../rules/controller-as-vm.js)
* [Example source](../examples/controller-as-vm.js)
