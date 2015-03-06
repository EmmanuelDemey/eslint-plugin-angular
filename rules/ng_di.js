module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    var angularObjectList = ['value', 'constant', 'factory', 'service', 'provider', 'controller', 'filter', 'directive'];

    function report(node, syntax){
        context.report(node, 'You should use the {{syntax}} syntax for DI', {
            syntax: syntax
        });
    }

    return {

        'CallExpression': function(node) {

            var syntax = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.object.name === 'angular' && angularObjectList.indexOf(callee.property.name) >= 0) {

               if(syntax === 'function' && (!utils.isFunctionType(node.arguments[1]) && !utils.isIdentifierType(node.arguments[1]))){
                  report(node, syntax);
               }
               if(syntax === 'array'){
                  if(!utils.isArrayType(node.arguments[1])){
                    report(node,  syntax);
                  } else {
                    var fn = node.arguments[1].elements[node.arguments[1].elements.length - 1];
                    if(utils.isFunctionType(fn) && fn.params.length !== node.arguments[1].elements.length - 1){
                      context.report(fn, 'The signature of the method is incorrect', {});
                    }
                  }
               }
            }
        }
    };

};
