[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)
[![Join the chat at https://gitter.im/Gillespie59/eslint-plugin-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Gillespie59/eslint-plugin-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/Gillespie59/eslint-plugin-angular/badge.svg?branch=master)](https://coveralls.io/r/Gillespie59/eslint-plugin-angular?branch=master)

This repository will give access to new rules for the ESLint tool. You should use it only if you are developing an AngularJS application. 

Since the 0.0.4 release, some rules defined in [John Papa's Guideline](https://github.com/johnpapa/angularjs-styleguide) have been implemented. In the description below, you will have a link to the corresponding part of the guideline, in order to have more information. 

# Usage

1. Install `eslint-plugin-angular` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-angular
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - angular
    ```
3. You can also configure these rules in your `.eslintrc`. All rules defined in this plugin have to be prefixed by 'angular/'

    ```yaml
    plugins:
      - angular
    rules:
      - angular/ng_controller_name: 0
    ```

# Rules

| Name  | Description | Default Configuration |
| ------------- | ------------- | ------------- |
| ng_angularelement  | The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object. | 'ng_angularelement': 1 |
| ng_controller_name  | All your controllers should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp. ("ng_controller_name":  [2, "ng"])  [Y123](https://github.com/johnpapa/angularjs-styleguide#style-y123), [Y124](https://github.com/johnpapa/angularjs-styleguide#style-y124)| 'ng_controller_name': [2, /[A-Z].*Controller$/] |
| ng_definedundefined | You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined. We also check the use of !angular.isUndefined and !angular.isDefined (should prefer the reverse function)| 'ng_definedundefined': 2 |
| ng_di | All your DI should use the same syntax : the Array or function syntaxes ("ng_di":  [2, "function or array"])| 'ng_di': [2, 'function'] |
| ng_directive_name | All your directives should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp. You can not prefix your directives by "ng" (reserved keyword for AngularJS directives) ("ng_directive_name":  [2, "ng"]) [Y073](https://github.com/johnpapa/angularjs-styleguide#style-y073), [Y126](https://github.com/johnpapa/angularjs-styleguide#style-y126) | 'ng_directive_name': 0 |
| ng_document_service | Instead of the default document object, you should prefer the AngularJS wrapper service $document. [Y180](https://github.com/johnpapa/angularjs-styleguide#style-y180) | 'ng_document_service': 2 |
| ng_empty_controller | If you have one empty controller, maybe you have linked it in your Router configuration or in one of your views. You can remove this declaration because this controller is useless | 'ng_empty_controller': 0 |
| ng_filter_name | All your filters should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp. ("ng_filter_name":  [2, "ng"]) | 'ng_filter_name': 0 |
| ng_interval_service | Instead of the default setInterval function, you should use the AngularJS wrapper service $interval  [Y181](https://github.com/johnpapa/angularjs-styleguide#style-y181) | 'ng_interval_service': 2 |
| ng_json_functions | You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify | 'ng_json_functions': 2 |
| ng_module_name  | When you create a new module, its name should start with the parameter you can define in your config object. The second parameter can be a Regexp. You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("ng_module_name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angularjs-styleguide#style-y127)| 'ng_module_name': 0 |
| ng_no_digest | The scope's $digest() method shouldn't be used. You should prefer the $apply method. | 'ng_no_digest': 2 |
| ng_no_jquery_angularelement | You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element| 'ng_no_jquery_angularelement': 2 |
| ng_no_private_call | All scope's properties/methods starting with $$ are used interally by AngularJS. You should not use them directly. | 'ng_no_private_call': 2 |
| ng_no_services  | Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm | 'ng_no_services': [2, ['$http', '$resource', 'Restangular']] |
| ng_no_service_method  | You should prefer the factory() method instead of service() [Y181](https://github.com/johnpapa/angularjs-styleguide#style-y181)| 'ng_no_service_method': 2 |
| ng_on_watch | Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler [Y035](https://github.com/johnpapa/angularjs-styleguide#style-y035) | 'ng_on_watch': 2 |
| ng_service_name | All your services should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp. You can not prefix your services by "$" (reserved keyword for AngularJS services) ("ng_service_name":  [2, "ng"]) [Y125](https://github.com/johnpapa/angularjs-styleguide#style-y125) | 'ng_on_watch': 2 |
| ng_timeout_service | Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout [Y181](https://github.com/johnpapa/angularjs-styleguide#style-y181) | 'ng_timeout_service': 2 |
| ng_typecheck_array | You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]"). | 'ng_typecheck_array': 2 |
| ng_typecheck_boolean | You should use the angular.isBoolean method instead of the default JavaScript implementation (typeof true === "[object Boolean]"). | 'ng_typecheck_boolean': 2 |
| ng_typecheck_date | You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]"). | 'ng_typecheck_date': 2 |
| ng_typecheck_function | You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]"). | 'ng_typecheck_function': 2 |
| ng_typecheck_number | You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). | 'ng_typecheck_number': 2 |
| ng_typecheck_object | You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").  | 'ng_typecheck_object': 2 |
| ng_typecheck_regexp | You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]"). | 'ng_typecheck_regexp': 2 |
| ng_typecheck_string | You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]"). | 'ng_typecheck_string': 2 |
| ng_window_service | Instead of the default window object, you should prefer the AngularJS wrapper service $window. [Y180](https://github.com/johnpapa/angularjs-styleguide#style-y180) | 'ng_window_service': 2 |

# Need your help
It is an opensource project. Any help will be very useful. You can : 
- Create issue
- Send Pull Request
- Write Documentation
- Add new Features
- Add new Rules
- Improve the quality
- Reply to issues

## Who uses it ? 
- [argo](https://github.com/albertosantini/argo)
- [generator-gillespie59-angular](https://github.com/Gillespie59/generator-gillespie59-angular/)

## Team

[![Emmanuel DEMEY](https://avatars.githubusercontent.com/u/555768?s=117)](http://gillespie59.github.io/) |
:---:|
[Emmanuel DEMEY](http://gillespie59.github.io/)
