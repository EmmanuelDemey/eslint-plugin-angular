/**
 * require and specify a prefix for all service names
 *
 * All your services should have a name starting with the parameter you can define in your config object.
 * The second parameter can be a Regexp wrapped in quotes.
 * You can not prefix your services by "$" (reserved keyword for AngularJS services) ("service-name":  [2, "ng"])
 **
 * @styleguideReference {johnpapa} `y125` Naming - Factory and Service Names
 * @version 0.1.0
 * @category naming
 */
'use strict';

var utils = require('./utils/utils');

module.exports = function(context) {
    return {

        CallExpression: function(node) {
            var prefix = context.options[0];
            var convertedPrefix; // convert string from JSON .eslintrc to regex

            if (prefix === undefined) {
                return;
            }

            convertedPrefix = utils.convertPrefixToRegex(prefix);

            if (utils.isAngularServiceDeclaration(node)) {
                var name = node.arguments[0].value;

                if (name !== undefined && name.indexOf('$') === 0) {
                    context.report(node, 'The {{service}} service should not start with "$". This is reserved for AngularJS services', {
                        service: name
                    });
                } else if (name !== undefined && !convertedPrefix.test(name)) {
                    if (typeof prefix === 'string' && !utils.isStringRegexp(prefix)) {
                        context.report(node, 'The {{service}} service should be prefixed by {{prefix}}', {
                            service: name,
                            prefix: prefix
                        });
                    } else {
                        context.report(node, 'The {{service}} service should follow this pattern: {{prefix}}', {
                            service: name,
                            prefix: prefix.toString()
                        });
                    }
                }
            }
        }
    };
};
