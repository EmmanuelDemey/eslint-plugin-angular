/**
 * @ruleName controller-name
 * @description
 *
 * All your controllers should have a name starting with the parameter you can define in your config object.
 * The second parameter can be a Regexp wrapped in quotes.
 * ("controller-name":  [2, "ng"])  [Y123](https://github.com/johnpapa/angular-styleguide#style-y123), [Y124](https://github.com/johnpapa/angular-styleguide#style-y124)
 */
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
                /**
                * Issue #124 for controller() calls inside karma tests
                */
                if(node.arguments.length === 0){
                  return;
                }

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
