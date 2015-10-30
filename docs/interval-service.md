<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/interval-service.js', 'examples/interval-service.js'). -->

# interval-service - use `$interval` instead of `setInterval`

Instead of the default setInterval function, you should use the AngularJS wrapper service $interval  [Y181](https://github.com/johnpapa/angular-styleguide#style-y181)

## Examples

Examples with default configuration

    /*eslint angular/interval-service: 2*/

    // valid
    $interval(function() {
        // ...
    }, 1000)

    // invalid
    setInterval(function() {
        // ...
    }, 1000) // error: You should use the $interval service instead of the default window.setInterval method

    // invalid
    window.setInterval(function() {
        // ...
    }, 1000) // error: You should use the $interval service instead of the default window.setInterval method

## Links

* [Rule source](../rules/interval-service.js)
* [Example source](../examples/interval-service.js)
