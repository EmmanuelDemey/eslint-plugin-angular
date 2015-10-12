/**
 * You should prefer the factory() method instead of service() [Y040](https://github.com/johnpapa/angular-styleguide#style-y040)
 *
 * @ruleName no-service-method
 * @config 2
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');

    return {

        CallExpression: function(node) {
            var prefix = context.options[0];
            if (prefix === undefined) {
                return;
            }

            if (utils.isAngularComponent(node) && node.callee.property.name === 'service') {
                context.report(node, 'You should prefer the factory() method instead of service()', {});
            }
        }
    };
};
