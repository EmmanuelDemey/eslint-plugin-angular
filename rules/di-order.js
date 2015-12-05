/**
 * require DI parameters to be sorted alphabetically
 *
 * Injected dependencies should be sorted alphabetically.
 * If the second parameter is set to false, values which start and end with an underscore those underscores are stripped.
 * This means for example that `_$httpBackend_` goes before `_$http_`.
 *
 * @version 0.6.0
 * @category conventions
 */
'use strict';

var angularRule = require('./utils/angular-rule');


module.exports = angularRule(function(context) {
    var stripUnderscores = context.options[0] !== false;

    function checkOrder(callee, fn) {
        if (!fn || !fn.params) {
            return;
        }
        var args = fn.params.map(function(arg) {
            if (stripUnderscores) {
                return arg.name.replace(/^_(.+)_$/, '$1');
            }
            return arg.name;
        });
        var sortedArgs = args.slice().sort();
        sortedArgs.some(function(value, index) {
            if (args.indexOf(value) !== index) {
                context.report(fn, 'Injected values should be sorted alphabetically');
                return true;
            }
        });
    }

    return {
        'angular:animation': checkOrder,
        'angular:config': checkOrder,
        'angular:controller': checkOrder,
        'angular:directive': checkOrder,
        'angular:factory': checkOrder,
        'angular:filter': checkOrder,
        'angular:inject': checkOrder,
        'angular:run': checkOrder,
        'angular:service': checkOrder,
        'angular:provider': function(callee, providerFn, $get) {
            checkOrder(null, providerFn);
            checkOrder(null, $get);
        }
    };
});
