<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/angularelement.js', 'examples/angularelement.js'). -->

# angularelement - use `angular.element` instead of `$` or `jQuery`

The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course).
If the jQuery library is imported, angular.element will be a wrapper around the jQuery object.

## Examples

The following patterns are considered problems;

    /*eslint angular/angularelement: 2*/

    // invalid
    $('.some-class'); // error: You should use angular.element instead of the jQuery $ object

    // invalid
    jQuery('.another-class'); // error: You should use angular.element instead of the jQuery $ object

The following patterns are **not** considered problems;

    /*eslint angular/angularelement: 2*/

    // valid
    angular.element('.some-class');

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/angularelement.js)
* [Example source](../examples/angularelement.js)
