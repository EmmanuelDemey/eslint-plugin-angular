module.exports = function(context) {
    'use strict';

    function recordError(node, origin){
        if(node.type === 'Literal' && (node.value === 'number' || node.value === '[object Number]')) {
            context.report(origin, 'You should use the angular.isNumber method', {});
        }
    }

    function checkNode(node){
        return node.type === 'Identifier'
            || (node.type === 'UnaryExpression'
                && node.operator === 'typeof');
    }

    return {

        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(checkNode(node.left)){
                    recordError(node.right, node);
                }
                else if(checkNode(node.right)){
                    recordError(node.left, node);
                }
            }
        }
    };
};
