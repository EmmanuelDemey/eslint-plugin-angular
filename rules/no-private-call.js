/**
 * All scope's properties/methods starting with $$ are used internally by AngularJS.
 * You should not use them directly.
 *
 * @ruleName no-private-call
 * @config 2
 */
module.exports = function(context) {

    'use strict';

    var bad = ['$$childHead', '$$childTail', '$$prevSibling', '$$nextSibling', '$$listeners',
        '$$phase', '$$watchers', '$$asyncQueue', '$$postDigest', '$$postDigestQueue',
        '$$isolateBindings', '$$destroyed'];

    function check(node, name){
        if(bad.indexOf(name) >= 0){
            context.report(node, 'Using $$-prefixed Angular objects/methods are not recommended', {});
        }
    }
    return {

        'Identifier': function(node) {
            check(node,  node.name);
        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];

