module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    var angularNamedObjectList = [
        'controller',
        'directive',
        'factory',
        'filter',
        'provider',
        'service'
    ];

    function checkOrder(node, fn) {
        var args = fn.params.map(function(arg) {
            return arg.name;
        });
        var sortedArgs = args.slice().sort();
        sortedArgs.some(function(value, index) {
            if(args.indexOf(value) !== index) {
                context.report(node, 'Injected values should be sorted alphabetically');
                return true;
            }
        });
    }

    return {

        'AssignmentExpression': function(node) {
            // The $get function of a provider.
            if(node.left.type === 'MemberExpression' && node.left.property.name === '$get') {
                return checkOrder(node, node.right);
            }
        },

        'CallExpression': function(node) {
            // An Angular component definition.
            if(utils.isAngularComponent(node) && node.callee.type === 'MemberExpression' && angularNamedObjectList.indexOf(node.callee.property.name) >= 0){
                return checkOrder(node, node.arguments[1]);
            }
            // Injected values in unittests.
            if(node.callee.type === 'Identifier' && node.callee.name === 'inject') {
                return checkOrder(node, node.arguments[0]);
            }
        }
    };
};
