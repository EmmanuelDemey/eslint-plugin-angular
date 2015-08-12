module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            if(prefix === undefined) {
                return;
            }

            if (utils.isAngularComponent(node) && node.callee.property.name === 'service') {
                context.report(node, 'You should prefer the factory() method instead of service()', {});
            }
        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
