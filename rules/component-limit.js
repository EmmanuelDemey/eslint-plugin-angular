module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');
    var limit = context.options[0] || 1;

    var components = [];

    return {

        'CallExpression': function(node) {
            if(utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                components.push(node);
            }
        },

        'Program:exit': function() {
            if(components.length > limit) {
                components.slice(limit).forEach(function(node) {
                    context.report(node, 'There may be at most {{limit}} AngularJS {{component}} per file, but found {{number}}', {
                        limit: limit,
                        component: limit === 1 ? 'component' : 'components',
                        number: components.length
                    });
                })
            }
        }
    };
};

module.exports.schema = [{
    type: 'integer'
}];
