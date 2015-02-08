module.exports = function(context) {

    'use strict';

    function report(node){
        context.report(node, 'You should use the $interval service instead of the default window.setInterval method', {});
    }

    return {

        'CallExpression': function(node) {
			if(node.callee.type === 'MemberExpression' && node.callee.object.name === 'window' && node.callee.property.name === 'setInterval'){
				report(node);
			}
        }
    };

};
