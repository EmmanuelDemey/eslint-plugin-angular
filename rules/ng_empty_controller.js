module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    function report(node, name){

        context.report(node, 'The {{ctrl}} controller is useless because empty. You can remove it from your Router configuration or in one of your view', {
            ctrl: name
        });
    }

    return {

        'CallExpression': function(node) {

            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'controller') {
               var name = node.arguments[0].value;

               var fn = node.arguments[1];
               if(utils.isArrayType(node.arguments[1])){
                    fn = node.arguments[1].elements[node.arguments[1].elements.length - 1];
               }
               if(utils.isFunctionType(fn) && utils.isEmptyFunction(fn)){
                    report(node, name);
               }
            }
        }
    };
};
