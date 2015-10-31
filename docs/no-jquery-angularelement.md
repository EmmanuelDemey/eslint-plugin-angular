<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-jquery-angularelement.js', 'examples/no-jquery-angularelement.js'). -->

# no-jquery-angularelement - disallow to wrap `angular.element` objects with `jQuery` or `$`

You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element

## Examples

Examples with default configuration

    /*eslint angular/no-jquery-angularelement: 2*/

    // valid
    angular.element("#id")

    // invalid
    $(angular.element("#id")) // error: angular.element returns already a jQLite element. No need to wrap with the jQuery object

    // invalid
    jQuery(angular.element("#id")) // error: angular.element returns already a jQLite element. No need to wrap with the jQuery object

## Links

* [Rule source](../rules/no-jquery-angularelement.js)
* [Example source](../examples/no-jquery-angularelement.js)
