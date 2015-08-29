/**
 * When you want to create a new promise, you should not use the $q.deferred anymore.
 * Prefer the new syntax : $q(function(resolve, reject){})
 *
 * @ruleName deferred
 * @config 0
 */
module.exports = function(context) {

    'use strict';

    return {

        'MemberExpression': function(node) {
            if(node.object.type === 'Identifier' && node.object.name === '$q'){
                if(node.property.type === 'Identifier' && node.property.name === 'defer'){
                    context.report(node, 'You should not create a new promise with this syntax. Use the $q(function(resolve, reject){}) syntax.', {});
                }

            }
        }
    };

};

module.exports.schema = [];
