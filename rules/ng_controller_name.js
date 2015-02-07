module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'controller') {
                var name = node.arguments[0].value;

               if(name !== undefined && !utils.isRegexp(prefix) && !(name.indexOf(prefix) === 0)){
                    context.report(node, 'The {{controller}} controller should be prefixed by {{prefix}}', {
                        controller: name,
                        prefix: prefix
                    });
                } else if(utils.isRegexp(prefix) && !prefix.test(name)){
                    context.report(node, 'The {{controller}} controller should follow this pattern: {{prefix}}', {
                        controller: name,
                        prefix: prefix.toString()
                    });
                }

            }
        }
    };

};
