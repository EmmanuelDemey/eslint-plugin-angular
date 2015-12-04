/**
 * disallow use of internal angular properties prefixed with $$
 *
 * All scope's properties/methods starting with $$ are used internally by AngularJS.
 * You should not use them directly.
 * Exception can be allowed with this option: {allow:['$$watchers']}
 *
 * @version 0.1.0
 * @category possibleError
 */
'use strict';

module.exports = function(context) {
    var options = context.options[0] || {};
    var allowed = options.allow || [];

    function check(node, name) {
        if (name.slice(0, 2) === '$$' && allowed.indexOf(name) < 0) {
            context.report(node, 'Using $$-prefixed Angular objects/methods are not recommended', {});
        }
    }
    return {

        Identifier: function(node) {
            check(node, node.name);
        }
    };
};

module.exports.schema = [
    {
        type: 'object',
        properties: {
            allow: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        },
        additionalProperties: false
    }
];
