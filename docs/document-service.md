<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/document-service.js', 'examples/document-service.js'). -->

# document-service - use `$document` instead of `document`

Instead of the default document object, you should prefer the AngularJS wrapper service $document.

**Styleguide Reference**

* [y180 by johnpapa - Angular $ Wrapper Services - $document and $window](https://github.com/johnpapa/angular-styleguide#style-y180)

## Examples

The following patterns are considered problems;

    /*eslint angular/document-service: 2*/

    // invalid
    document.title // error: You should use the $document service instead of the default document object

    // invalid
    document.title // error: You should use the $document service instead of the default document object

The following patterns are **not** considered problems;

    /*eslint angular/document-service: 2*/

    // valid
    $document[0].title = ""

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/document-service.js)
* [Example source](../examples/document-service.js)
