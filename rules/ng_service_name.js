module.exports = function(context) {

    'use strict';

    function report(node, name, prefix){

        context.report(node, 'The {{service}} service should be prefixed by {{prefix}}', {
            service: name,
            prefix: prefix
        });
    }

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' &&
                (callee.property.name === 'provider' || callee.property.name === 'service' || callee.property.name === 'factory' || callee.property.name === 'constant' || callee.property.name === 'value')) {
                var name = node.arguments[0].value;

               if(name !== undefined && !(name.indexOf(prefix) === 0)){
                    report(node, name, prefix);
                }

            }
        }
    };

};
