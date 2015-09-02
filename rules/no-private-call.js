module.exports = function(context) {
    'use strict';

    var options = context.options[0] || {},
        allowed = options.allow || [];

    function check(node, name){
        if(name.slice(0,2) == '$$' && allowed.indexOf(name) < 0){
            context.report(node, 'Using $$-prefixed Angular objects/methods are not recommended', {});
        }
    }
    return {

        'Identifier': function(node) {
            check(node,  node.name);
        }
    };

};

module.exports.schema = [
    {
        type: 'object',
        properties: {
            allow: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        },
        additionalProperties: false
    }
];

