<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/module-dependency-order.js', 'examples/module-dependency-order.js'). -->

# module-dependency-order - require a consistent order of module dependencies

Module dependencies should be sorted in a logical manner.
This rule provides two ways to sort modules, grouped or ungrouped.
In grouped mode the modules should be grouped in the order: standard modules - third party modules - custom modules.
The modules should be sorted alphabetically within its group.
A prefix can be specified to determine which prefix the custom modules have.
Without grouped set to `false` all dependencies combined should be sorted alphabetically.
('module-dependency-order', [2, {grouped: true, prefix: "app"}])

## Examples

The following patterns are considered problems with default config;

    /*eslint angular/module-dependency-order: 2*/

    // invalid
    angular.module('myModule', ['ngRoute', 'ngAnimate']); // error: ngAnimate should be sorted before ngRoute

The following patterns are **not** considered problems with default config;

    /*eslint angular/module-dependency-order: 2*/

    // valid
    angular.module('myModule', ['app', 'appFilters', 'ngAnimate', 'ngRoute', 'ui.router']);

The following patterns are considered problems when configured `{"grouped":true}`:

    /*eslint angular/module-dependency-order: [2,{"grouped":true}]*/

    // invalid
    angular.module('myModule', ['app', 'ngAnimate']); // error: ngAnimate is a standard module and should be sorted before app

The following patterns are **not** considered problems when configured `{"grouped":true}`:

    /*eslint angular/module-dependency-order: [2,{"grouped":true}]*/

    // valid
    angular.module('myModule', ['ngAnimate', 'ngRoute', 'app', 'appFilters', 'ui.router']);

The following patterns are considered problems when configured `{"grouped":true,"prefix":"app"}`:

    /*eslint angular/module-dependency-order: [2,{"grouped":true,"prefix":"app"}]*/

    // invalid
    angular.module('myModule', ['ngRoute', 'app', 'ui.router']); // error: ui.router is a third party module and should be sorted before app

The following patterns are **not** considered problems when configured `{"grouped":true,"prefix":"app"}`:

    /*eslint angular/module-dependency-order: [2,{"grouped":true,"prefix":"app"}]*/

    // valid
    angular.module('myModule', ['ngAnimate', 'ngRoute', 'ui.router', 'app', 'appFilters']);

## Version

This rule was introduced in eslint-plugin-angular 0.12.0

## Links

* [Rule source](../rules/module-dependency-order.js)
* [Example source](../examples/module-dependency-order.js)
