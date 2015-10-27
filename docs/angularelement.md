<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/angularelement.js', 'examples/angularelement.js'). -->

# angularelement - use `angular.element` instead of `$` or `jQuery`

The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course).
If the jQuery library is imported, angular.element will be a wrapper around the jQuery object.

## Examples

Examples with default configuration

    /*eslint angular/angularelement: 2*/

    // valid
    angular.element('.some-class');

    // invalid
    $('.some-class'); // error: You should use angular.element instead of the jQuery $ object

    // invalid
    jQuery('.another-class'); // error: You should use angular.element instead of the jQuery $ object

## Links

* [Rule source](../rules/angularelement.js)
* [Example source](../examples/angularelement.js)
