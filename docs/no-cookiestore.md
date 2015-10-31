<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-cookiestore.js', 'examples/no-cookiestore.js'). -->

# no-cookiestore - use `$cookies` instead of `$cookieStore`

In Angular 1.4, the $cookieStore service is now deprected.
Please use the $cookies service instead

## Examples

Examples with default configuration

    /*eslint angular/no-cookiestore: 2*/

    // valid
    $cookies.put('favoriteMeal', 'pizza');

    // valid
    $cookies.get('favoriteMeal');

    // invalid
    $cookieStore.put('favoriteMeal', 'pizza'); // error: Since Angular 1.4, the $cookieStore service is depreacted. Please use now the $cookies service.

    // invalid
    $cookieStore.get('favoriteMeal'); // error: Since Angular 1.4, the $cookieStore service is depreacted. Please use now the $cookies service.

## Links

* [Rule source](../rules/no-cookiestore.js)
* [Example source](../examples/no-cookiestore.js)
