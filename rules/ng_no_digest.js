module.exports = function(context) {

    'use strict';

    return {

        'MemberExpression': function(node) {
			if(node.property.type === 'Identifier' && node.property.name === '$digest'){
                context.report(node, 'Instead of using the $digest() method, you should prefer $apply()', {});
            }
        }
    };

};
