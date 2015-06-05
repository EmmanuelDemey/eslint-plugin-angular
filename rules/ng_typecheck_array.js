module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    function recordError(node, origin){
        if(node.type === 'Literal' && node.value === '[object Array]') {
            context.report(origin, 'You should use the angular.isArray method', {});
        }
    }

    return {
        'MemberExpression': function(node){
            if(node.object.name === 'Array' && node.property.name === 'isArray') {
                context.report(node, 'You should use the angular.isArray method', {});
            }
        },
        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(utils.isTypeOfStatement(node.left)){
                    recordError(node.right, node);
                }
                else if(utils.isTypeOfStatement(node.right)){
                    recordError(node.left, node);
                }
            }
        }
    };
};
