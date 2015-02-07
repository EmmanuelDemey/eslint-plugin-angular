module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' &&
                (callee.property.name === 'provider' || callee.property.name === 'service' || callee.property.name === 'factory' || callee.property.name === 'constant' || callee.property.name === 'value')) {
                var name = node.arguments[0].value;

               if(name !== undefined && !utils.isRegexp(prefix) && !(name.indexOf(prefix) === 0)){
                    context.report(node, 'The {{service}} service should be prefixed by {{prefix}}', {
                        service: name,
                        prefix: prefix
                    });
                } else if(utils.isRegexp(prefix) && !prefix.test(name)){
                    context.report(node, 'The {{service}} service should follow this pattern: {{prefix}}', {
                        service: name,
                        prefix: prefix.toString()
                    });
                }

            }
        }
    };

};
