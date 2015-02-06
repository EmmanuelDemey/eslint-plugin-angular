(function(){
	'use strict';

	module.exports = {
		rules: {
			'ng_angularelement': require('./rules/ng_angularelement'),
			'ng_controller_name': require('./rules/ng_controller_name'),
			'ng_definedundefined': require('./rules/ng_definedundefined'),
			'ng_di': require('./rules/ng_di'),
			'ng_directive_name': require('./rules/ng_directive_name'),
			'ng_empty_controller': require('./rules/ng_empty_controller'),
			'ng_filter_name': require('./rules/ng_filter_name'),
			'ng_json_functions': require('./rules/ng_json_functions'),
			'ng_module_name': require('./rules/ng_module_name'),
			'ng_on_watch': require('./rules/ng_on_watch'),
			'ng_service_name': require('./rules/ng_service_name'),
			'ng_timeout_service': require('./rules/ng_timeout_service'),
			'ng_typecheck_array': require('./rules/ng_typecheck_array'),
			'ng_typecheck_boolean': require('./rules/ng_typecheck_boolean'),
			'ng_typecheck_date': require('./rules/ng_typecheck_date'),
			'ng_typecheck_function': require('./rules/ng_typecheck_function'),
			'ng_typecheck_number': require('./rules/ng_typecheck_number'),
			'ng_typecheck_object': require('./rules/ng_typecheck_object'),
			'ng_typecheck_regexp': require('./rules/ng_typecheck_regexp'),
			'ng_typecheck_string': require('./rules/ng_typecheck_string'),
			'ng_window_service': require('./rules/ng_window_service')
		},
		rulesConfig: {
			'ng_angularelement': 1,
			'ng_controller_name': 0,
			'ng_definedundefined': 2,
			'ng_di': [2, 'function'],
			'ng_directive_name': 0,
			'ng_empty_controller': 0,
			'ng_filter_name': 0,
			'ng_json_functions': 2,
			'ng_module_name': 0,
			'ng_on_watch': 2,
			'ng_service_name': 0,
			'ng_timeout_service': 2,
			'ng_typecheck_array': 2,
			'ng_typecheck_boolean': 2,
			'ng_typecheck_date': 2,
			'ng_typecheck_function': 2,
			'ng_typecheck_number': 2,
			'ng_typecheck_object': 2,
			'ng_typecheck_regexp': 2,
			'ng_typecheck_string': 2,
			'ng_window_service': 2
		}
		};
})();
