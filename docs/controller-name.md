<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/controller-name.js', 'examples/controller-name.js'). -->

# controller-name - require and specify a prefix for all controller names

All your controllers should have a name starting with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
("controller-name":  [2, "ng"])  [Y123](https://github.com/johnpapa/angular-styleguide#style-y123), [Y124](https://github.com/johnpapa/angular-styleguide#style-y124)

## Examples

Examples with default configuration

    /*eslint angular/controller-name: 2*/

    // valid
    angular.module('myModule').controller('MyController', function () {
       // ...
    });

    // invalid
    angular.module('myModule').controller('MyCtrl', function () {
        // ...
    }); // error: The MyCtrl controller should follow this pattern: /[A-Z].*Controller$/

Examples with the configuration `"ui"`

    /*eslint angular/controller-name: [2,"ui"]*/

    // valid
    angular.module('myModule').controller('uiTabsController', function () {
        // ...
    });

    // invalid
    angular.module('myModule').controller('TabsController', function () {
        // ...
    }); // error: The TabsController controller should be prefixed by ui

Examples with the configuration `"/[A-Z].*Ctrl/"`

    /*eslint angular/controller-name: [2,"/[A-Z].*Ctrl/"]*/

    // valid
    angular.module('myModule').controller('MyCtrl', function () {
        // ...
    });

    // invalid
    angular.module('myModule').controller('MyController', function () {
        // ...
    }); // error: The MyController controller should follow this pattern: /[A-Z].*Ctrl/

## Links

* [Rule source](../rules/controller-name.js)
* [Example source](../examples/controller-name.js)
