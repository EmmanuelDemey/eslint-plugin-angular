/**
 * use `$q(function(resolve, reject){})` instead of `$q.deferred`
 *
 * When you want to create a new promise, you should not use the $q.deferred anymore.
 * Prefer the new syntax : $q(function(resolve, reject){})
 * @version 0.1.0
 * @category bestPractice
 * @sinceAngularVersion 1.x
 */
'use strict';

var utils = require('./utils/utils');

module.exports = {
    meta: {
        schema: []
    },
    create: function(context) {
        return {

            MemberExpression: function(node) {
                if (node.object.type === 'Identifier' && utils.isAngularServiceImport(node.object.name, '$q')) {
                    if (node.property.type === 'Identifier' && node.property.name === 'defer') {
                        context.report(node, 'You should not create a new promise with this syntax. Use the $q(function(resolve, reject) {}) syntax.', {});
                    }
                }
            }
        };
    }
};
