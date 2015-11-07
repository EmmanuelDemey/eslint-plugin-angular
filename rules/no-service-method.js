/**
 * use `factory()` instead of `service()`
 *
 * You should prefer the factory() method instead of service()
 *
 * @styleguideReference {johnpapa} `y040` Services - Singletons
 * @version 0.1.0
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');

    return {

        CallExpression: function(node) {
            if (utils.isAngularComponent(node) && node.callee.property && node.callee.property.name === 'service') {
                context.report(node, 'You should prefer the factory() method instead of service()', {});
            }
        }
    };
};
