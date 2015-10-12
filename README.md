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
- [Sample configs](sample-configs)
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



## Sample configs

- [demo/npm](https://github.com/Gillespie59/eslint-plugin-angular/tree/master/demo/npm) (launch: npm run lint)
- [demo/grunt](https://github.com/Gillespie59/eslint-plugin-angular/tree/master/demo/grunt) (launch: grunt)
- [demo/gulp](https://github.com/Gillespie59/eslint-plugin-angular/tree/master/demo/gulp) (launch: gulp)



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

 * [angularelement](docs/angularelement.md) - The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course)
 * [component-limit](docs/component-limit.md) - The number of AngularJS components in one file should be limited
 * [controller-as](docs/controller-as.md) - You should not set properties on $scope in controllers
 * [controller-as-route](docs/controller-as-route.md) - You should use Angular's controllerAs syntax when defining routes or states
 * [controller-as-vm](docs/controller-as-vm.md) - You should use a capture variable for 'this' when using the controllerAs syntax
 * [controller-name](docs/controller-name.md) - All your controllers should have a name starting with the parameter you can define in your config object
 * [deferred](docs/deferred.md) - When you want to create a new promise, you should not use the $q.deferred anymore
 * [definedundefined](docs/definedundefined.md) - You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined
 * [di](docs/di.md) - All your DI should use the same syntax : the Array or function syntaxes ("di":  [2, "function or array"])
 * [di-order](docs/di-order.md) - Injected dependencies should be sorted alphabetically
 * [di-unused](docs/di-unused.md) - Unused dependencies should not be injected.
 * [directive-name](docs/directive-name.md) - All your directives should have a name starting with the parameter you can define in your config object
 * [directive-restrict](docs/directive-restrict.md) - Not all directive restrictions may be desirable
 * [document-service](docs/document-service.md) - Instead of the default document object, you should prefer the AngularJS wrapper service $document
 * [empty-controller](docs/empty-controller.md) - If you have one empty controller, maybe you have linked it in your Router configuration or in one of your views
 * [foreach](docs/foreach.md) - You should use the angular.forEach method instead of the default JavaScript implementation [].forEach.
 * [file-name](docs/file-name.md) - All your file names should match the angular component name
 * [filter-name](docs/filter-name.md) - All your filters should have a name starting with the parameter you can define in your config object
 * [function-type](docs/function-type.md) - Anonymous or named functions inside AngularJS components
 * [interval-service](docs/interval-service.md) - Instead of the default setInterval function, you should use the AngularJS wrapper service $interval  [Y181](https://github.com/johnpapa/angular-styleguide#style-y181)
 * [json-functions](docs/json-functions.md) - You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify
 * [log](docs/log.md) - You should use $log service instead of console for the methods 'log', 'debug', 'error', 'info', 'warn'
 * [module-dependency-order](docs/module-dependency-order.md) - Module dependencies should be sorted in a logical manner
 * [module-getter](docs/module-getter.md) - When using a module, avoid using a variable and instead use chaining with the getter syntax [Y022](https://github.com/johnpapa/angular-styleguide#style-y022)
 * [module-name](docs/module-name.md) - When you create a new module, its name should start with the parameter you can define in your config object
 * [module-setter](docs/module-setter.md) - Declare modules without a variable using the setter syntax.[Y021](https://github.com/johnpapa/angular-styleguide#style-y021)
 * [no-angular-mock](docs/no-angular-mock.md) - All methods defined in the angular.mock object are also available in the object window
 * [no-controller](docs/no-controller.md) - According to the Component-First pattern, we should avoid the use of AngularJS controller.
 * [no-cookiestore](docs/no-cookiestore.md) - In Angular 1.4, the $cookieStore service is now deprected
 * [no-digest](docs/no-digest.md) - DEPRECATED! The scope's $digest() method shouldn't be used
 * [no-http-callback](docs/no-http-callback.md) - Disallow the $http success and error function
 * [no-inline-template](docs/no-inline-template.md) - Instead of using inline HTML templates, it is better to load the HTML from an external file
 * [no-jquery-angularelement](docs/no-jquery-angularelement.md) - You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element
 * [no-private-call](docs/no-private-call.md) - All scope's properties/methods starting with $$ are used internally by AngularJS
 * [no-services](docs/no-services.md) - Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm
 * [no-service-method](docs/no-service-method.md) - You should prefer the factory() method instead of service() [Y040](https://github.com/johnpapa/angular-styleguide#style-y040)
 * [on-watch](docs/on-watch.md) - Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler
 * [rest-service](docs/rest-service.md) - Check the service used to send request to your REST API
 * [service-name](docs/service-name.md) - All your services should have a name starting with the parameter you can define in your config object
 * [timeout-service](docs/timeout-service.md) - Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout [Y181](https://github.com/johnpapa/angular-styleguide#style-y181)
 * [typecheck-array](docs/typecheck-array.md) - You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]").
 * [typecheck-date](docs/typecheck-date.md) - You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]").
 * [typecheck-function](docs/typecheck-function.md) - You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]").
 * [typecheck-number](docs/typecheck-number.md) - You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]").
 * [typecheck-object](docs/typecheck-object.md) - You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").
 * [typecheck-regexp](docs/typecheck-regexp.md) - You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]").
 * [typecheck-string](docs/typecheck-string.md) - You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]").
 * [watchers-execution](docs/watchers-execution.md) - For the execution of the watchers, the $digest method will start from the scope in which we call the method
 * [window-service](docs/window-service.md) - Instead of the default window object, you should prefer the AngularJS wrapper service $window



## Need your help

It is an opensource project. Any help will be very useful. You can :
- Create issue
- Send Pull Request
- Write Documentation
- Add new Features
- Add new Rules
- Improve the quality
- Reply to issues

All contributions should be pushed in the current GIT branch.



## How to create a new rule

Here are the things you should do before sending a Pull Request with a new Rule :

- Create a JavaScript file for the new rule in the rules directory
- Create an unit test for this rule in the test directory (with the same name)
- Update the main index.js file, in order to add the new rule in the 'rules' property, and set the default configuration in the rulesConfig property
- Update the "Rules" part of the README.md file with a small description of the rule and its default configuration. In this file, you have to add your rule in the default JSON configuration object. 

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
