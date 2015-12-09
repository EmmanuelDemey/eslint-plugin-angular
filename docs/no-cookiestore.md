<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-cookiestore.js', 'examples/no-cookiestore.js'). -->

# no-cookiestore - use `$cookies` instead of `$cookieStore`

In Angular 1.4, the $cookieStore service is now deprected.
Please use the $cookies service instead

## Examples

The following patterns are considered problems;

    /*eslint angular/no-cookiestore: 2*/

    // invalid
    $cookieStore.put('favoriteMeal', 'pizza'); // error: Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service.

    // invalid
    $cookieStore.get('favoriteMeal'); // error: Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service.

The following patterns are **not** considered problems;

    /*eslint angular/no-cookiestore: 2*/

    // valid
    $cookies.put('favoriteMeal', 'pizza');

    // valid
    $cookies.get('favoriteMeal');

## Version

This rule was introduced in eslint-plugin-angular 0.3.0

## Links

* [Rule source](../rules/no-cookiestore.js)
* [Example source](../examples/no-cookiestore.js)
