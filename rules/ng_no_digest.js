module.exports = function(context) {

    'use strict';

    return {

        'CallExpression': function(node) {
			if(node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === '$digest'){
                context.report(node, 'Instead of using the $digest() method, you should prefer $apply()', {});
            }
        }
    };

};
