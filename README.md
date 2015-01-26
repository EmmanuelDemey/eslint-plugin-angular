[![Build Status](https://travis-ci.org/Gillespie59/eslint-plugin-angular.svg?branch=master)](https://travis-ci.org/Gillespie59/eslint-plugin-angular)
[![Npm dependencies](https://david-dm.org/Gillespie59/eslint-plugin-angular.svg)](https://david-dm.org/Gillespie59/eslint-plugin-angular)
[![devDependency Status](https://david-dm.org/Gillespie59/eslint-plugin-angular/dev-status.png)](https://david-dm.org/Gillespie59/eslint-plugin-angular#info=devDependencies)


This repository will give access to new rules for the ESLint tool. You should use it only if you are developping an AngularJS application. 

# Rules

| Name  | Description |
| ------------- | ------------- |
| ng_angularelement  | The angular.element method should be used of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object.  |
| ng_controller_name  | All your controllers should have a name starting the parameter you can define in your config object ("ng_controller_name":  [2, "ng"]) |
| ng_definedundefined | You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined (myVar === undefined) |
| ng_directive_name | All your directives should have a name starting the parameter you can define in your config object ("ng_directive_name":  [2, "ng"]) |
| ng_filter_name | All your filters should have a name starting the parameter you can define in your config object ("ng_filter_name":  [2, "ng"]) |
| ng_json_functions | You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify |
| ng_on_watch | Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler |
| ng_service_name | All your services should have a name starting the parameter you can define in your config object ("ng_service_name":  [2, "ng"]) |
| ng_timeout_service | Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout |
| ng_typecheck_array | You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]").  |
| ng_typecheck_boolean | You should use the angular.isBoolean method instead of the default JavaScript implementation (typeof true === "[object Boolean]").  |
| ng_typecheck_date | You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]").  |
| ng_typecheck_function | You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]").  |
| ng_typecheck_number | You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). |
| ng_typecheck_object | Yo	u should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]").  |
| ng_typecheck_regexp | You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]"). |
| ng_typecheck_string | You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]"). |
| ng_window_service | Instead of the default window object, you should prefer the AngularJS wrapper service $window. |

# Need your help
It is an opensource project. Any help will be very useful. You can : 
- Create issue
- Send Pull Request
- Write Documentation
- Add new Features
- Add new Rules
- Improve the quality
- Reply to issues
