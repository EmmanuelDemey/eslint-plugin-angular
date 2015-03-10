module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0],
                convertedPrefix; // convert string from JSON .eslintrc to regex

            if(prefix === undefined) {
                return;
            }

            convertedPrefix = utils.convertPrefixToRegex(prefix);

            var callee = node.callee;
            if(callee.type === 'MemberExpression' && callee.property.name === 'controller') {
                var name = node.arguments[0].value;

               if(name !== undefined && !convertedPrefix.test(name)){
                    if(typeof prefix === 'string' && !utils.isStringRegexp(prefix)) {
                        context.report(node, 'The {{controller}} controller should be prefixed by {{prefix}}', {
                            controller: name,
                            prefix: prefix
                        });
                    } else {
                        context.report(node, 'The {{controller}} controller should follow this pattern: {{prefix}}', {
                            controller: name,
                            prefix: prefix.toString()
                       });
                    }
                }

            }
        }
    };

};
