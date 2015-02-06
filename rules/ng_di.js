module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

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
               if(syntax === 'function' && !utils.isFunctionType(node.arguments[1])){
                  report(node, node.arguments[0].value, syntax);
               }
               if(syntax === 'array' && !utils.isArrayType(node.arguments[1])){
                  report(node, node.arguments[0].value, syntax);
               }
            }
        }
    };

};
