[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)


This repository will give access to new rules for the ESLint tool. You should use it only if you are developping an AngularJS application. 

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


# Rules

| Name  | Description | Default Configuration |
| ------------- | ------------- | ------------- |
| ng_angularelement  | The angular.element method should be used of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object. | 'ng_angularelement': 1 |
| ng_controller_name  | All your controllers should have a name starting with the parameter you can define in your config object ("ng_controller_name":  [2, "ng"]) | 'ng_controller_name': 0 |
| ng_definedundefined | You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined. | 'ng_definedundefined': 2 |
| ng_di | All your DI should use the same syntax : the Array or function syntaxes ("ng_di":  [2, "function or array"])| 'ng_di': [2, 'function'] |
| ng_directive_name | All your directives should have a name starting the parameter you can define in your config object ("ng_directive_name":  [2, "ng"]) | 'ng_directive_name': 0 |
| ng_filter_name | All your filters should have a name starting the parameter you can define in your config object ("ng_filter_name":  [2, "ng"]) | 'ng_filter_name': 0 |
| ng_json_functions | You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify | 'ng_json_functions': 2 |
| ng_module_name  | When you create a new module, its name should start with the parameter you can define in your config object ("ng_module_name":  [2, "ng"]) | 'ng_module_name': 0 |
| ng_on_watch | Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler | 'ng_on_watch': 2 |
| ng_service_name | All your services should have a name starting the parameter you can define in your config object ("ng_service_name":  [2, "ng"]) | 'ng_on_watch': 2 |
| ng_timeout_service | Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout | 'ng_timeout_service': 2 |
| ng_typecheck_array | You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]"). | 'ng_typecheck_array': 2 |
| ng_typecheck_boolean | You should use the angular.isBoolean method instead of the default JavaScript implementation (typeof true === "[object Boolean]"). | 'ng_typecheck_boolean': 2 |
| ng_typecheck_date | You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]"). | 'ng_typecheck_date': 2 |
| ng_typecheck_function | You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]"). | 'ng_typecheck_function': 2 |
| ng_typecheck_number | You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). | 'ng_typecheck_number': 2 |
| ng_typecheck_object | Yo	u should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").  | 'ng_typecheck_object': 2 |
| ng_typecheck_regexp | You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]"). | 'ng_typecheck_regexp': 2 |
| ng_typecheck_string | You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]"). | 'ng_typecheck_string': 2 |
| ng_window_service | Instead of the default window object, you should prefer the AngularJS wrapper service $window. | 'ng_window_service': 2 |

# Need your help
It is an opensource project. Any help will be very useful. You can : 
- Create issue
- Send Pull Request
- Write Documentation
- Add new Features
- Add new Rules
- Improve the quality
- Reply to issues
