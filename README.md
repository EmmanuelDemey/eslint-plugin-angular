[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)
[![Join the chat at https://gitter.im/Gillespie59/eslint-plugin-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Gillespie59/eslint-plugin-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/Gillespie59/eslint-plugin-angular/badge.svg?branch=master)](https://coveralls.io/r/Gillespie59/eslint-plugin-angular?branch=master)

This repository will give access to new rules for the ESLint tool. You should use it only if you are developing an AngularJS application.

Since the 0.0.4 release, some rules defined in [John Papa's Guideline](https://github.com/johnpapa/angular-styleguide) have been implemented. In the description below, you will have a link to the corresponding part of the guideline, in order to have more information.

# Usage

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

| Name  | Description |
| ------------- | ------------- |
| **Name** </br> ng_angularelement           </br> **Default** </br> 'ng_angularelement': 1                                       | The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object. |
| **Name** </br> ng_controller_as            </br> **Default** </br> 'ng_controller_as': 2                                        | You should not set properties on $scope in controllers. Use controllerAs syntax and add data to 'this'. Implements 'this' check part of [Y031](https://github.com/johnpapa/angular-styleguide#style-y031). The second parameter can be a Regexp for identifying controller functions (when using something like Browserify) |
| **Name** </br> ng_controller_as_route      </br> **Default** </br> 'ng_controller_as_route': 2                                  | You should use Angular's controllerAs syntax when defining routes or states. Implements route part [Y031](https://github.com/johnpapa/angular-styleguide#style-y031) |
| **Name** </br> ng_controller_as_vm         </br> **Default** </br> 'ng_controller_as_vm': [2, 'vm']                             | You should use a capture variable for 'this' when using the controllerAs syntax. [Y031](https://github.com/johnpapa/angular-styleguide#style-y032). The second parameter specifies the capture variable you want to use in your application. The third parameter can be a Regexp for identifying controller functions (when using something like Browserify) |
| **Name** </br> ng_controller_name          </br> **Default** </br> 'ng_controller_name': [2, /[A-Z].*Controller$/]              | All your controllers should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. ("ng_controller_name":  [2, "ng"])  [Y123](https://github.com/johnpapa/angular-styleguide#style-y123), [Y124](https://github.com/johnpapa/angular-styleguide#style-y124)|
| **Name** </br> ng_definedundefined         </br> **Default** </br> 'ng_definedundefined': 2                                     | You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined. We also check the use of !angular.isUndefined and !angular.isDefined (should prefer the reverse function)|
| **Name** </br> ng_di                       </br> **Default** </br> 'ng_di': [2, 'function']                                     | All your DI should use the same syntax : the Array or function syntaxes ("ng_di":  [2, "function or array"])|
| **Name** </br> ng_directive_name           </br> **Default** </br> 'ng_directive_name': 0                                       | All your directives should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your directives by "ng" (reserved keyword for AngularJS directives) ("ng_directive_name":  [2, "ng"]) [Y073](https://github.com/johnpapa/angular-styleguide#style-y073), [Y126](https://github.com/johnpapa/angular-styleguide#style-y126) |
| **Name** </br> ng_document_service         </br> **Default** </br> 'ng_document_service': 2                                     | Instead of the default document object, you should prefer the AngularJS wrapper service $document. [Y180](https://github.com/johnpapa/angular-styleguide#style-y180) |
| **Name** </br> ng_empty_controller         </br> **Default** </br> 'ng_empty_controller': 0                                     | If you have one empty controller, maybe you have linked it in your Router configuration or in one of your views. You can remove this declaration because this controller is useless |
| **Name** </br> ng_foreach                  </br> **Default** </br> 'ng_foreach': 0                                              | You should use the angular.forEach method instead of the default JavaScript implementation [].forEach. |
| **Name** </br> ng_filter_name              </br> **Default** </br> 'ng_filter_name': 0                                          | All your filters should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. ("ng_filter_name":  [2, "ng"]) |
| **Name** </br> ng_function_type            </br> **Default** </br> 'ng_function_type': 0                                        | Anonymous or named functions inside AngularJS components. The first parameter sets which type of function is required and can be 'named' or 'anonymous'. The second parameter is an optional list of angular object names. [Y024](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y024) |
| **Name** </br> ng_interval_service         </br> **Default** </br> 'ng_interval_service': 2                                     | Instead of the default setInterval function, you should use the AngularJS wrapper service $interval  [Y181](https://github.com/johnpapa/angular-styleguide#style-y181) |
| **Name** </br> ng_json_functions           </br> **Default** </br> 'ng_json_functions': 2                                       | You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify |
| **Name** </br> ng_module_getter            </br> **Default** </br> 'ng_module_getter':2                                         | When using a module, avoid using a variable and instead use chaining with the getter syntax [Y022](https://github.com/johnpapa/angular-styleguide#style-y022)|
| **Name** </br> ng_module_name              </br> **Default** </br> 'ng_module_name': 0                                          | When you create a new module, its name should start with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("ng_module_name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angular-styleguide#style-y127)|
| **Name** </br> ng_module_setter            </br> **Default** </br> 'ng_module_setter':2                                         | Declare modules without a variable using the setter syntax.[Y021](https://github.com/johnpapa/angular-styleguide#style-y021) |
| **Name** </br> ng_no_digest                </br> **Default** </br> 'ng_no_digest': 2                                            | The scope's $digest() method shouldn't be used. You should prefer the $apply method. |
| **Name** </br> ng_no_jquery_angularelement </br> **Default** </br> 'ng_no_jquery_angularelement': 2                             | You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element|
| **Name** </br> ng_no_private_call          </br> **Default** </br> 'ng_no_private_call': 2                                      | All scope's properties/methods starting with $$ are used internally by AngularJS. You should not use them directly. |
| **Name** </br> ng_no_services              </br> **Default** </br> 'ng_no_services': [2, ['$http', '$resource', 'Restangular']] | Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm. The second parameter specifies the services. The third parameter can be a list of angular objects (controller, factory, etc.). Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']}) |
| **Name** </br> ng_no_service_method        </br> **Default** </br> 'ng_no_service_method': 2                                    | You should prefer the factory() method instead of service() [Y181](https://github.com/johnpapa/angular-styleguide#style-y181)|
| **Name** </br> ng_on_watch                 </br> **Default** </br> 'ng_on_watch': 2                                             | Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler [Y035](https://github.com/johnpapa/angular-styleguide#style-y035) |
| **Name** </br> ng_service_name             </br> **Default** </br> 'ng_on_watch': 2                                             | All your services should have a name starting with the parameter you can define in your config object. The second parameter can be a Regexp wrapped in quotes. You can not prefix your services by "$" (reserved keyword for AngularJS services) ("ng_service_name":  [2, "ng"]) [Y125](https://github.com/johnpapa/angular-styleguide#style-y125) |
| **Name** </br> ng_timeout_service          </br> **Default** </br> 'ng_timeout_service': 2                                      | Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout [Y181](https://github.com/johnpapa/angular-styleguide#style-y181) |
| **Name** </br> ng_typecheck_array          </br> **Default** </br> 'ng_typecheck_array': 2                                      | You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]"). |
| **Name** </br> ng_typecheck_boolean        </br> **Default** </br> 'ng_typecheck_boolean': 2                                    | You should use the angular.isBoolean method instead of the default JavaScript implementation (typeof true === "[object Boolean]"). |
| **Name** </br> ng_typecheck_date           </br> **Default** </br> 'ng_typecheck_date': 2                                       | You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]"). |
| **Name** </br> ng_typecheck_function       </br> **Default** </br> 'ng_typecheck_function': 2                                   | You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]"). |
| **Name** </br> ng_typecheck_number         </br> **Default** </br> 'ng_typecheck_number': 2                                     | You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). |
| **Name** </br> ng_typecheck_object         </br> **Default** </br> 'ng_typecheck_object': 2                                     | You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").  |
| **Name** </br> ng_typecheck_regexp         </br> **Default** </br> 'ng_typecheck_regexp': 2                                     | You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]"). |
| **Name** </br> ng_typecheck_string         </br> **Default** </br> 'ng_typecheck_string': 2                                     | You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]"). |
| **Name** </br> ng_window_service           </br> **Default** </br> 'ng_window_service': 2                                       | Instead of the default window object, you should prefer the AngularJS wrapper service $window. [Y180](https://github.com/johnpapa/angular-styleguide#style-y180) |

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

* Create a JavaScript file for the new rule in the rules directory
* Create an unit test for this rule in the test directory
* Update the main index.js file, in order to add the new rule in the 'rules' property, and set the default configuration in the rulesConfig property
* Update the "Rules" part of the README.md file with a small description of the rule and its default configuration.

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
