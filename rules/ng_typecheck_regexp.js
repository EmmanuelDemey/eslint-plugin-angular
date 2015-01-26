module.exports = function(context) {

    'use strict';

    function recordError(node, origin){
        if(node.type === 'Literal' && node.value === '[object RegExp]') {
            context.report(origin, 'You should use the angular.isRegexp method', {});
        }
    }

    function checkNode(node){
        return node.type === 'Identifier'
            || (node.type === 'CallExpression'
            && node.callee.type === 'MemberExpression'
            && node.callee.object.name === 'toString'
            && node.callee.property.name === 'call');
    }

    return {

        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(checkNode(node.left)){
                    recordError(node.right, node);
                } else if(checkNode(node.right)){
                    recordError(node.left, node);
                }
            }
        }
    };
};
