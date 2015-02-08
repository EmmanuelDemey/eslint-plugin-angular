module.exports = function(context) {

    'use strict';

    var message = 'You should use the $interval service instead of the default window.setInterval method';

    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'window' && node.property.name === 'setInterval'){
                context.report(node, message, {});
            }
        },

        'CallExpression': function(node) {
            if(node.callee.name === 'setInterval'){
                context.report(node, message, {});
            }
        }
    };

};
