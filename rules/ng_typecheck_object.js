module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    function recordError(node, origin){
        if(node.type === 'Literal' && node.value === 'object') {
            context.report(origin, 'You should use the angular.isObject method', {});
        }
    }

    return {
        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(utils.isTypeOfStatement(node.left)){
                    recordError(node.right, node);
                } else if(utils.isTypeOfStatement(node.right)){
                    recordError(node.left, node);
                }
            }
        }
    };
};
