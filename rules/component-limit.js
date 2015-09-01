module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');
    var limit = context.options[0] || 1;

    var components = [];

    return {

        'CallExpression': function(node) {
            if(utils.isAngularComponent(node)) {
                components.push(node);
            }
        },

        'Program:exit': function() {
            if(components.length > limit) {
                components.slice(limit).forEach(function(node) {
                    context.report(node, 'There may be at most {{limit}} AngularJS {{component}} per file', {
                        limit: limit,
                        component: limit === 1 ? 'component' : 'components'
                    });
                })
            }
        }
    };
};

module.exports.schema = [{
    type: 'integer'
}];
