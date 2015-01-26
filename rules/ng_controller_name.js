module.exports = function(context) {

    'use strict';

    function report(node, name, prefix){

        context.report(node, 'The {{controller}} controller should be prefixed by {{prefix}}', {
            controller: name,
            prefix: prefix
        });
    }

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'controller') {
                var name = node.arguments[0].value;

               if(name !== undefined && !(name.indexOf(prefix) === 0)){
                    report(node, name, prefix);
                }

            }
        }
    };

};
