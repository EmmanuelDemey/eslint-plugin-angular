module.exports = function(context) {

    'use strict';

    function report(node, name, prefix){

        context.report(node, 'The {{directive}} directive should be prefixed by {{prefix}}', {
            directive: name,
            prefix: prefix
        });
    }

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'directive') {
                var name = node.arguments[0].value;

               if(name !== undefined && !(name.indexOf(prefix) === 0)){
                    report(node, name, prefix);
                }

            }
        }
    };

};
