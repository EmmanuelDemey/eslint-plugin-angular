module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    function isArray(node){
        return node !== undefined && node.type === 'ArrayExpression';
    }
    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'module') {
               var name = node.arguments[0].value;

               if(isArray(node.arguments[1]) && name !== undefined && !utils.isRegexp(prefix) && !(name.indexOf(prefix) === 0)){

                   context.report(node, 'The {{module}} module should be prefixed by {{prefix}}', {
                        module: name,
                        prefix: prefix
                    });

                } else if(isArray(node.arguments[1]) && utils.isRegexp(prefix) && !prefix.test(name)){
                    context.report(node, 'The {{module}} module should follow this pattern: {{prefix}}', {
                        module: name,
                        prefix: prefix.toString()
                    });
                }
            }
        }
    };
};
