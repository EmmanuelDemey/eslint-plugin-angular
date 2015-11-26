[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)
[![Join the chat at https://gitter.im/Gillespie59/eslint-plugin-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Gillespie59/eslint-plugin-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/Gillespie59/eslint-plugin-angular/badge.svg?branch=master)](https://coveralls.io/r/Gillespie59/eslint-plugin-angular?branch=master)



## Summary

This repository will give access to new rules for the ESLint tool. You should use it only if you are developing an AngularJS application.

Since the 0.0.4 release, some rules defined in [John Papa's Guideline](https://github.com/johnpapa/angular-styleguide) have been implemented. In the description below, you will have a link to the corresponding part of the guideline, in order to have more information.



## Contents

- [Usage with shareable config](#usage-with-shareable-config)
- [Usage without shareable config](#usage-without-shareable-config)
- [Defaults](#defaults)
- [Rules](#rules)
- [Need your help](#need-your-help)
- [How to create a new rule](#how-to-create-a-new-rule)
- [Default ESLint configuration file](#default-eslint-configuration-file)
- [Who uses it?](#who-uses-it)
- [Team](#team)



## Usage with [shareable](http://eslint.org/docs/developer-guide/shareable-configs.html) config

Users may use the shareable [eslint-config-angular](https://github.com/dustinspecker/eslint-config-angular) to quickly setup eslint-plugin-angular. It also marks Angular as a global variable and defines required ESLint rules to use this plugin.

1. Install `eslint` as a dev-dependency:

    ```shell
    npm install --save-dev eslint
    ```

2. Install `eslint-plugin-angular` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-angular
    ```

3. Install `eslint-config-angular` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-config-angular
    ```

4. Use the shareable config by adding it to your `.eslintrc`:

    ```yaml
    extends: angular
    ```



## Usage without shareable config

1. Install `eslint` as a dev-dependency:

    ```shell
    npm install --save-dev eslint
    ```

2. Install `eslint-plugin-angular` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-angular
    ```

3. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - angular
    ```
4. You can also configure these rules in your `.eslintrc`. All rules defined in this plugin have to be prefixed by 'angular/'

    ```yaml
    plugins:
      - angular
    rules:
      - angular/controller_name: 0
    ```



## Defaults

```json
{
    "plugins": [
        "angular/angular"
    ],
    "rules": {
        "angular/angularelement": 1,
        "angular/controller-as": 2,
        "angular/controller-as-route": 2,
        "angular/controller-as-vm": [2, "vm"],
        "angular/controller-name": [2, "/[A-Z].*Controller$/"],
        "angular/deferred": 0,
        "angular/definedundefined": 2,
        "angular/di": [2, "function"],
        "angular/di-order": [0, true],
        "angular/directive-name": 0,
        "angular/directive-restrict": [0, {"restrict": "AE", "explicit": "never"}],
        "angular/component-limit": [0, 1],
        "angular/document-service": 2,
        "angular/empty-controller": 0,
        "angular/file-name": 0,
        "angular/filter-name": 0,
        "angular/foreach": 0,
        "angular/function-type": 0,
        "angular/interval-service": 2,
        "angular/json-functions": 2,
        "angular/log": 2,
        "angular/module-dependency-order": [0, {"grouped": true, "prefix": null}],
        "angular/module-getter": 2,
        "angular/module-name": 0,
        "angular/module-setter": 2,
        "angular/no-angular-mock": 0,
        "angular/no-controller": 0,
        "angular/no-cookiestore": 2,
        "angular/no-digest": 2,
        "angular/no-http-callback": 2,
        "angular/no-inline-template": [0, {"allowSimple": true}],
        "angular/no-jquery-angularelement": 2,
        "angular/no-private-call": 2,
        "angular/no-service-method": 2,
        "angular/no-services": [2, ["$http", "$resource", "Restangular"]],
        "angular/on-watch": 2,
        "angular/one-dependency-per-line": 0,
        "angular/rest-service": 0,
        "angular/service-name": 2,
        "angular/timeout-service": 2,
        "angular/typecheck-array": 2,
        "angular/typecheck-date": 2,
        "angular/typecheck-function": 2,
        "angular/typecheck-number": 2,
        "angular/typecheck-object": 2,
        "angular/typecheck-regexp": 2,
        "angular/typecheck-string": 2,
        "angular/watchers-execution": [0, "$digest"],
        "angular/window-service": 2
    }
}
```



## Rules


 * [angularelement](docs/angularelement.md) - use `angular.element` instead of `$` or `jQuery`
 * [component-limit](docs/component-limit.md) - limit the number of angular components per file ([y001](https://github.com/johnpapa/angular-styleguide#style-y001))
 * [controller-as](docs/controller-as.md) - disallow assignments to `$scope` in controllers ([y031](https://github.com/johnpapa/angular-styleguide#style-y031))
 * [controller-as-route](docs/controller-as-route.md) - require the use of controllerAs in routes or states ([y031](https://github.com/johnpapa/angular-styleguide#style-y031))
 * [controller-as-vm](docs/controller-as-vm.md) - require and specify a capture variable for `this` in controllers ([y032](https://github.com/johnpapa/angular-styleguide#style-y032))
 * [controller-name](docs/controller-name.md) - require and specify a prefix for all controller names ([y123](https://github.com/johnpapa/angular-styleguide#style-y123), [y124](https://github.com/johnpapa/angular-styleguide#style-y124))
 * [deferred](docs/deferred.md) - use `$q(function(resolve, reject){})` instead of `$q.deferred`
 * [definedundefined](docs/definedundefined.md) - use `angular.isDefined` and `angular.isUndefined` instead of other undefined checks
 * [di](docs/di.md) - require a consistent DI syntax
 * [di-order](docs/di-order.md) - require DI parameters to be sorted alphabetically
 * [di-unused](docs/di-unused.md) - disallow unused DI parameters
 * [directive-name](docs/directive-name.md) - require and specify a prefix for all directive names ([y073](https://github.com/johnpapa/angular-styleguide#style-y073), [y126](https://github.com/johnpapa/angular-styleguide#style-y126))
 * [directive-restrict](docs/directive-restrict.md) - disallow any other directive restrict than 'A' or 'E' ([y074](https://github.com/johnpapa/angular-styleguide#style-y074))
 * [document-service](docs/document-service.md) - use `$document` instead of `document` ([y180](https://github.com/johnpapa/angular-styleguide#style-y180))
 * [empty-controller](docs/empty-controller.md) - disallow empty controllers
 * [file-name](docs/file-name.md) - require and specify a consistent component name pattern ([y120](https://github.com/johnpapa/angular-styleguide#style-y120), [y121](https://github.com/johnpapa/angular-styleguide#style-y121))
 * [filter-name](docs/filter-name.md) - require and specify a prefix for all filter names
 * [foreach](docs/foreach.md) - use `angular.forEach` instead of native `Array.prototype.forEach`
 * [function-type](docs/function-type.md) - require and specify a consistent function style for components ('named' or 'anonymous') ([y024](https://github.com/johnpapa/angular-styleguide#style-y024))
 * [interval-service](docs/interval-service.md) - use `$interval` instead of `setInterval` ([y181](https://github.com/johnpapa/angular-styleguide#style-y181))
 * [json-functions](docs/json-functions.md) - use `angular.fromJson` and 'angular.toJson' instead of `JSON.parse` and `JSON.stringify`
 * [log](docs/log.md) - use the `$log` service instead of the `console` methods
 * [module-dependency-order](docs/module-dependency-order.md) - require a consistent order of module dependencies
 * [module-getter](docs/module-getter.md) - disallow to reference modules with variables and require to use the getter syntax instead `angular.module('myModule')` ([y022](https://github.com/johnpapa/angular-styleguide#style-y022))
 * [module-name](docs/module-name.md) - require and specify a prefix for all module names ([y127](https://github.com/johnpapa/angular-styleguide#style-y127))
 * [module-setter](docs/module-setter.md) - disallow to assign modules to variables (linked to [module-getter](docs/module-getter.md) ([y021](https://github.com/johnpapa/angular-styleguide#style-y021))
 * [no-angular-mock](docs/no-angular-mock.md) - require to use `angular.mock` methods directly
 * [no-controller](docs/no-controller.md) - disallow use of controllers (according to the component first pattern)
 * [no-cookiestore](docs/no-cookiestore.md) - use `$cookies` instead of `$cookieStore`
 * [no-digest](docs/no-digest.md) - DEPRECATED! use `$apply()` instead of `$digest()` (replaced by [watchers-execution](docs/watchers-execution.md))
 * [no-http-callback](docs/no-http-callback.md) - disallow the `$http` methods `success()` and `error()`
 * [no-inline-template](docs/no-inline-template.md) - disallow the use of inline templates
 * [no-jquery-angularelement](docs/no-jquery-angularelement.md) - disallow to wrap `angular.element` objects with `jQuery` or `$`
 * [no-private-call](docs/no-private-call.md) - disallow use of internal angular properties prefixed with $$
 * [no-services](docs/no-services.md) - disallow DI of specified services for other angular components (`$http` for controllers, filters and directives)
 * [no-service-method](docs/no-service-method.md) - use `factory()` instead of `service()` ([y040](https://github.com/johnpapa/angular-styleguide#style-y040))
 * [on-watch](docs/on-watch.md) - require `$on` and `$watch` deregistration callbacks to be saved in a variable
 * [one-dependency-per-line](docs/one-dependency-per-line.md) - require all DI parameters to be located in their own line
 * [rest-service](docs/rest-service.md) - disallow different rest service and specify one of '$http', '$resource', 'Restangular'
 * [service-name](docs/service-name.md) - require and specify a prefix for all service names ([y125](https://github.com/johnpapa/angular-styleguide#style-y125))
 * [timeout-service](docs/timeout-service.md) - use `$timeout` instead of `setTimeout` ([y181](https://github.com/johnpapa/angular-styleguide#style-y181))
 * [typecheck-array](docs/typecheck-array.md) - use `angular.isArray` instead of `typeof` comparisons
 * [typecheck-date](docs/typecheck-date.md) - use `angular.isDate` instead of `typeof` comparisons
 * [typecheck-function](docs/typecheck-function.md) - use `angular.isFunction` instead of `typeof` comparisons
 * [typecheck-number](docs/typecheck-number.md) - use `angular.isNumber` instead of `typeof` comparisons
 * [typecheck-object](docs/typecheck-object.md) - use `angular.isObject` instead of `typeof` comparisons
 * [typecheck-regexp](docs/typecheck-regexp.md) - DEPRECATED! use `angular.isRegexp` instead of other comparisons (no native angular method)
 * [typecheck-string](docs/typecheck-string.md) - use `angular.isString` instead of `typeof` comparisons
 * [watchers-execution](docs/watchers-execution.md) - require and specify consistent use `$scope.digest()` or `$scope.apply()`
 * [window-service](docs/window-service.md) - use `$window` instead of `window` ([y180](https://github.com/johnpapa/angular-styleguide#style-y180))
----


## Need your help

It is an opensource project. Any help will be very useful. You can :
- Create issue
- Send Pull Request
- Write Documentation
- Add new Features
- Add new Rules
- Improve the quality
- Reply to issues

All development happens on the `development` branch. This means all pull requests should be made to the `development` branch.

If it is time to release, @Gillespie59 will bump the version in `package.json`, create a Git tag and merge the `development` branch into `master`. @Gillespie59 will then publish the new release to the npm registry.



## How to create a new rule

We appreciate contributions and the following notes will help you before you open a Pull Request.

### Check the issues

Have a look at the existing issues. There may exist similar issues with useful information.

### Files you have to create

* `rules/<your-rule>.js`
    * JavaScript file with the new rule
    * The filename `<your-rule>` is exactly the usage name in eslint configs `angular/<your-rule>`
    * Have a look at the `angularRule` wrapper and the `utils` (both in `rules/utils/`) - they probably make things easier for you
    * Add a documentation comment to generate a markdown documentation with the `gulp docs` task
* `test/<your-rule>.js`
    * Write some tests and execute them with `gulp test`
    * Have a look at the coverage reports `coverage/lcov-report/index.html`
* `examples/<your-rule>.js`
    * Add some examples for the documentation
    * Run the `gulp docs` task to test the examples and update the markdown documentation
* `docs/<your-rule>.js`
    * Generated by the `gulp docs` task

### Files you have to touch

* `index.js`
   * Add your rule `rulesConfiguration.addRule('<your-rule>', [0, {someConfig: 'someValue'])`

### Before you open your PR

* Check that the `gulp` task is working
* Commit generated changes in `README.md` and `docs/<your-rule>.js`
* Open your PR to the `development` branch NOT `master`

### Rules specific for Angular 1 or 2

We can use a property, defined in the ESLint configuration file, in order to know which version is used : Angular 1 or Angular 2. based on this property, you can create rules for each version.

```yaml
plugins:
  - angular

rules:
    angular/controller-name:
      - 2
      - '/[A-Z].*Controller$/'

globals:
    angular: true

settings:
    angular: 2
```

And in your rule, you can access to this property thanks to the `context` object :

```javascript
//If Angular 2 is used, we disabled the rule
if(context.settings.angular === 2){
    return {};
}

return {

    'CallExpression': function(node) {
    }
};
```



## Default ESLint configuration file

Here is the basic configuration for the rules defined in the ESLint plugin, in order to be compatible with the guideline provided by @johnpapa :

```json
{
    "rules": {
        "no-use-before-define": 0
    }
}
```



## Who uses it?

- [argo](https://github.com/albertosantini/argo)
- [generator-gillespie59-angular](https://github.com/Gillespie59/generator-gillespie59-angular/)
- [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly)



## Team

[![Emmanuel DEMEY](https://avatars.githubusercontent.com/u/555768?s=117)](http://gillespie59.github.io/) |
:---:|
[Emmanuel DEMEY](http://gillespie59.github.io/)
