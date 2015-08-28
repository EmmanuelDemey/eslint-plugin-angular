[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)
[![Join the chat at https://gitter.im/Gillespie59/eslint-plugin-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Gillespie59/eslint-plugin-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/Gillespie59/eslint-plugin-angular/badge.svg?branch=master)](https://coveralls.io/r/Gillespie59/eslint-plugin-angular?branch=master)

This repository will give access to new rules for the ESLint tool. You should use it only if you are developing an AngularJS application.

Since the 0.0.4 release, some rules defined in [John Papa's Guideline](https://github.com/johnpapa/angular-styleguide) have been implemented. In the description below, you will have a link to the corresponding part of the guideline, in order to have more information.

# Usage with [shareable](http://eslint.org/docs/developer-guide/shareable-configs.html) config
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

# Usage without shareable config

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
      - angular/ng_controller_name: 0
    ```

We provide also three samples :
* demo/npm (launch: npm run lint)
* demo/grunt (launch: grunt)
* demo/gulp (launch: gulp)

# Rules

| Name and Default | Description |
| ------------- | ------------- |
| 'ng_angularelement': 1                                       | The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object. |
| 'ng_controller_as': 2                                        | You should not set properties on $scope in controllers. Use controllerAs syntax and add data to 'this'. Implements 'this' check part of [Y031](https://github.com/johnpapa/angular-styleguide#style-y031). The second parameter can be a Regexp for identifying controller functions (when using something like Browserify) |
| 'ng_controller_as_route': 2                                  | You should use Angular's controllerAs syntax when defining routes or states. Implements route part [Y031](https://github.com/johnpapa/angular-styleguide#style-y031) |
| 'ng_controller_as_vm': [2, 'vm']                             | You should use a capture variable for 'this' when using the controllerAs syntax. [Y031](https://github.com/johnpapa/angular-styleguide#style-y032). The second parameter specifies the capture variable you want to use in your application. The third parameter can be a Regexp for identifying controller functions (when using something like Browserify) |
| 'ng_controller_name': [2, /[A-Z].*Controller$/]              | All your controllers should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. ("ng_controller_name":  [2, "ng"])  [Y123](https://github.com/johnpapa/angular-styleguide#style-y123), [Y124](https://github.com/johnpapa/angular-styleguide#style-y124)|
| 'ng_deferred':0                                              | When you want to create a new promise, you should not use the $q.deferred anymore. Prefer the new syntax : $q(function(resolve, reject){})
| 'ng_definedundefined': 2                                     | You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined. We also check the use of !angular.isUndefined and !angular.isDefined (should prefer the reverse function)|
| 'ng_di': [2, 'function']                                     | All your DI should use the same syntax : the Array or function syntaxes ("ng_di":  [2, "function or array"])|
| 'ng_di_order': [0, true]                                     | Injected dependencies should be sorted alphabetically. If the second parameter is set to false, values which start and end with an underscore those underscores are stripped. This means for example that `_$httpBackend_` goes before `_$http_`. |
| 'ng_directive_name': 0                                       | All your directives should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your directives by "ng" (reserved keyword for AngularJS directives) ("ng_directive_name":  [2, "ng"]) [Y073](https://github.com/johnpapa/angular-styleguide#style-y073), [Y126](https://github.com/johnpapa/angular-styleguide#style-y126) |
| 'ng_document_service': 2                                     | Instead of the default document object, you should prefer the AngularJS wrapper service $document. [Y180](https://github.com/johnpapa/angular-styleguide#style-y180) |
| 'ng_empty_controller': 0                                     | If you have one empty controller, maybe you have linked it in your Router configuration or in one of your views. You can remove this declaration because this controller is useless |
| 'ng_file_name': 0                                            | All your file names should match the angular component name. The second parameter can be a config object [2, {nameStyle: 'dash', typeSeparator: 'dot', ignoreTypeSuffix: true}] to match `avenger-profile.directive.js` or `avanger-api.service.js`. Possible values for `typeSeparator` and `nameStyle` are `dot`, `dash` and `underscore`. The options `ignoreTypeSuffix` ignores camel cased suffixes like `someController` or `myService`. [Y120](https://github.com/johnpapa/angular-styleguide#style-y120) [Y121](https://github.com/johnpapa/angular-styleguide#style-y121) |
| 'ng_filter_name': 0                                          | All your filters should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. ("ng_filter_name":  [2, "ng"]) |
| 'ng_foreach': 0                                              | You should use the angular.forEach method instead of the default JavaScript implementation [].forEach. |
| 'ng_function_type': 0                                        | Anonymous or named functions inside AngularJS components. The first parameter sets which type of function is required and can be 'named' or 'anonymous'. The second parameter is an optional list of angular object names. [Y024](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y024) |
| 'ng_interval_service': 2                                     | Instead of the default setInterval function, you should use the AngularJS wrapper service $interval  [Y181](https://github.com/johnpapa/angular-styleguide#style-y181) |
| 'ng_json_functions': 2                                       | You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify |
| 'ng_log': 2                                                  | You should use $log service instead of console for the methods 'log', 'debug', 'error', 'info', 'warn' |
| 'ng_module_getter':2                                         | When using a module, avoid using a variable and instead use chaining with the getter syntax [Y022](https://github.com/johnpapa/angular-styleguide#style-y022)|
| 'ng_module_name': 0                                          | When you create a new module, its name should start with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("ng_module_name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angular-styleguide#style-y127)|
| 'ng_module_setter':2                                         | Declare modules without a variable using the setter syntax.[Y021](https://github.com/johnpapa/angular-styleguide#style-y021) |
| 'ng_no_angular_mock':0                                       | All methods defined in the angular.mock object are also available in the object window. So you can remove angular.mock from your code
| 'ng_no_controller': 0                                        | According to the Component-First pattern, we should avoid the use of AngularJS controller. |
| 'ng_no_cookiestore':2                                        | In Angular 1.4, the $cookieStore service is now deprected. Please use the $cookies service instead|
| 'ng_no_digest': 2                                            | DEPRECATED! The scope's $digest() method shouldn't be used. You should prefer the $apply method. |
| 'ng_no_jquery_angularelement': 2                             | You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element|
| 'ng_no_private_call': 2                                      | All scope's properties/methods starting with $$ are used internally by AngularJS. You should not use them directly. |
| 'ng_no_service_method': 2                                    | You should prefer the factory() method instead of service() [Y040](https://github.com/johnpapa/angular-styleguide#style-y040)|
| 'ng_no_services': [2, ['$http', '$resource', 'Restangular']] | Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm. The second parameter specifies the services. The third parameter can be a list of angular objects (controller, factory, etc.). Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']}) |
| 'ng_on_watch': 2                                             | Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler |
| 'ng_rest_service': 0                                         | Check the service used to send request to your REST API. This rule can have one parameter, with one of the following values: $http, $resource or Restangular ('ng_rest_service': [0, '$http']).
| 'ng_service_name': 2                                         | All your services should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your services by "$" (reserved keyword for AngularJS services) ("ng_service_name":  [2, "ng"]) [Y125](https://github.com/johnpapa/angular-styleguide#style-y125) |
| 'ng_timeout_service': 2                                      | Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout [Y181](https://github.com/johnpapa/angular-styleguide#style-y181) |
| 'ng_typecheck_array': 2                                      | You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]"). |
| 'ng_typecheck_date': 2                                       | You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]"). |
| 'ng_typecheck_function': 2                                   | You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]"). |
| 'ng_typecheck_number': 2                                     | You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). |
| 'ng_typecheck_object': 2                                     | You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").  |
| 'ng_typecheck_regexp': 2                                     | You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]"). |
| 'ng_typecheck_string': 2                                     | You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]"). |
| 'ng_watchers_execution': [0, '$digest']                      | For the execution of the watchers, the $digest method will start from the scope in which we call the method. This will cause an performance improvement comparing to the $apply method, who start from the $rootScope |
| 'ng_window_service': 2                                       | Instead of the default window object, you should prefer the AngularJS wrapper service $window. [Y180](https://github.com/johnpapa/angular-styleguide#style-y180) |


# Need your help
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

* Create a JavaScript file for the new rule in the rules directory (the name of the file should be prefixed by 'ng' for Angular 1 rules, or 'ng2' for Angular 2 rules)
* Create an unit test for this rule in the test directory (with the same name)
* Update the main index.js file, in order to add the new rule in the 'rules' property, and set the default configuration in the rulesConfig property
* Update the "Rules" part of the README.md file with a small description of the rule and its default configuration.

We can use a property, defined in the ESLint configuration file, in order to know which version is used : Angular 1 or Angular 2. based on this property, you can create rules for each version.

```yaml
plugins:
  - angular

rules:
    angular/ng_controller_name:
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

## Default ESLint Configuration file

Here is the basic configuration for the rules defined in the ESLint plugin, in order to be compatible with the guideline provided by @johnpapa :

```json
{
    "rules": {
        "no-use-before-define": 0
    }
}
```

## Who uses it ?
- [argo](https://github.com/albertosantini/argo)
- [generator-gillespie59-angular](https://github.com/Gillespie59/generator-gillespie59-angular/)
- [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly)

## Team

[![Emmanuel DEMEY](https://avatars.githubusercontent.com/u/555768?s=117)](http://gillespie59.github.io/) |
:---:|
[Emmanuel DEMEY](http://gillespie59.github.io/)
