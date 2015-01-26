module.exports = function(context) {

    'use strict';

    function report(node){
        context.report(node, 'You should use the $timeout service instead of the default window.setTimeout method', {});
    }

    return {

        'CallExpression': function(node) {
			if(node.callee.type === 'MemberExpression' && node.callee.object.name === 'window' && node.callee.property.name === 'setTimeout'){
				report(node);
			}
        }
    };

};
