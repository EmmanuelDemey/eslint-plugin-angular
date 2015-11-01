<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/log.js', 'examples/log.js'). -->

# log - use the `$log` service instead of the `console` methods

You should use $log service instead of console for the methods 'log', 'debug', 'error', 'info', 'warn'

## Examples

The following patterns are considered problems;

    /*eslint angular/log: 2*/

    // invalid
    console.log('Hello world!'); // error: You should use the "log" method of the AngularJS Service $log instead of the console object

    // invalid
    console.error('Some error!'); // error: You should use the "error" method of the AngularJS Service $log instead of the console object

The following patterns are **not** considered problems;

    /*eslint angular/log: 2*/

    // valid
    $log.log('Hello world!');

    // valid
    $log.error('Some error!');

## Version

This rule was introduced in eslint-plugin-angular 0.1.0

## Links

* [Rule source](../rules/log.js)
* [Example source](../examples/log.js)
