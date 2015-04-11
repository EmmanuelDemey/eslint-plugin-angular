module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'ExpressionStatement': function(node) {

            var calleeObject;

            if (utils.isAngularComponent(node.expression) || utils.isAngularRunSection(node.expression) || utils.isAngularConfigSection(node.expression)) {

                calleeObject = node.expression.callee.object;
                if (!(calleeObject.type === 'CallExpression' && utils.isAngularModuleGetter(calleeObject))) {
                    context.report(node, 'Avoid using a variable and instead use chaining with the getter syntax.');
                }
            }
        }
    };
};
