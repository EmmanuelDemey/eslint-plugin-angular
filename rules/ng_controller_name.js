module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0],
                convertedPrefix = prefix, // convert string from JSON .eslintrc to regex

                // is supplied prefix a string containing a regex?
                // used to provide correct error message
                prefixIsRegex = false;

            if(prefix === undefined) {
                return;
            }

            if(typeof prefix === 'string') {
                // remove starting and ending slashes because new RegExp() adds them
                if(convertedPrefix[0] === '/' && convertedPrefix[convertedPrefix.length - 1]) {
                    convertedPrefix = convertedPrefix.substring(1, convertedPrefix.length - 1);
                    prefixIsRegex = true;
                }
                // add .* so normal strings for matching the start of a controller name still pass
                convertedPrefix = new RegExp(convertedPrefix + ".*");
            }


            var callee = node.callee;
            if(callee.type === 'MemberExpression' && callee.property.name === 'controller') {
                var name = node.arguments[0].value;

               if(name !== undefined && !convertedPrefix.test(name)){
                    if(typeof prefix === 'string' && !prefixIsRegex) {
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
