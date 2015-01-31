module.exports = function(context) {

    'use strict';

    var angularObjectList = ['value', 'constant', 'factory', 'service', 'provider', 'controller', 'filter', 'directive'];

    function report(node, name, syntax){
        context.report(node, 'You should use the {{syntax}} syntax for DI', {
            syntax: syntax
        });
    }

    return {

        'CallExpression': function(node) {

            var syntax = context.options[0];
            var callee = node.callee;

            if (callee.type === 'MemberExpression' && callee.object.name === 'angular' && angularObjectList.indexOf(callee.property.name) >= 0) {
               if(syntax === 'function' && node.arguments[1].type !== 'FunctionExpression'){
					report(node, node.arguments[0].value, syntax);
               }
               if(syntax === 'array' && node.arguments[1].type !== 'ArrayExpression'){
					report(node, node.arguments[0].value, syntax);
               }
            }
        }
    };

};
