<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/timeout-service.js', 'examples/timeout-service.js'). -->

# timeout-service - use `$timeout` instead of `setTimeout`

Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout
*

**Styleguide Reference**

* [y181 by johnpapa - Angular $ Wrapper Services - $timeout and $interval](https://github.com/johnpapa/angular-styleguide#style-y181)

## Examples

The following patterns are considered problems;

    /*eslint angular/timeout-service: 2*/

    // invalid
    setTimeout(function() {
        // ...
    }, 1000) // error: You should use the $timeout service instead of the default window.setTimeout method

    // invalid
    window.setTimeout(function() {
        // ...
    }, 1000) // error: You should use the $timeout service instead of the default window.setTimeout method

The following patterns are **not** considered problems;

    /*eslint angular/timeout-service: 2*/

    // valid
    $timeout(function() {
        // ...
    }, 1000)

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/timeout-service.js)
* [Example source](../examples/timeout-service.js)
