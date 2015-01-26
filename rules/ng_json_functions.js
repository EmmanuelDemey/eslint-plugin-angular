module.exports = function(context) {

    'use strict';

    return {

        'CallExpression': function(node) {
            if(node.callee.type === 'MemberExpression' && node.callee.object.name === 'JSON'){
                if(node.callee.property.name === 'stringify'){
                    context.report(node, 'You should use the toJson method instead of JSON.strigify', {});
                } else if(node.callee.property.name === 'parse'){
                    context.report(node, 'You should use the fromJson method instead of JSON.parse', {});
                }
            }
        }
    };

};
