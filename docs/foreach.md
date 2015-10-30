<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/foreach.js', 'examples/foreach.js'). -->

# foreach - use `angular.forEach` instead of native `Array.prototype.forEach`

You should use the angular.forEach method instead of the default JavaScript implementation [].forEach.

## Examples

Examples with default configuration

    /*eslint angular/foreach: 2*/

    // valid
    angular.forEach(someArray, function (element) {
        // ...
    });

    // invalid
    someArray.forEach(function (element) {
        // ...
    }); // error: You should use the angular.forEach method

## Links

* [Rule source](../rules/foreach.js)
* [Example source](../examples/foreach.js)
