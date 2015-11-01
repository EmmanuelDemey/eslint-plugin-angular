<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/interval-service.js', 'examples/interval-service.js'). -->

# interval-service - use `$interval` instead of `setInterval`

Instead of the default setInterval function, you should use the AngularJS wrapper service $interval

**Styleguide Reference**

* [y181 by johnpapa - Angular $ Wrapper Services - $timeout and $interval](https://github.com/johnpapa/angular-styleguide#style-y181)

## Examples

The following patterns are considered problems;

    /*eslint angular/interval-service: 2*/

    // invalid
    setInterval(function() {
        // ...
    }, 1000) // error: You should use the $interval service instead of the default window.setInterval method

    // invalid
    window.setInterval(function() {
        // ...
    }, 1000) // error: You should use the $interval service instead of the default window.setInterval method

The following patterns are **not** considered problems;

    /*eslint angular/interval-service: 2*/

    // valid
    $interval(function() {
        // ...
    }, 1000)

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/interval-service.js)
* [Example source](../examples/interval-service.js)
