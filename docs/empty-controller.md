<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/empty-controller.js', 'examples/empty-controller.js'). -->

# empty-controller - disallow empty controllers

If you have one empty controller, maybe you have linked it in your Router configuration or in one of your views.
You can remove this declaration because this controller is useless

## Examples

Examples with default configuration

    /*eslint angular/empty-controller: 2*/

    // valid
    angular.module('myModule').controller('MyController', function ($log) {
        $log.log('Hello World!');
    });

    // invalid
    angular.module('myModule').controller('EmptyController', function () {
    }); // error: The EmptyController controller is useless because empty. You can remove it from your Router configuration or in one of your view

## Links

* [Rule source](../rules/empty-controller.js)
* [Example source](../examples/empty-controller.js)
