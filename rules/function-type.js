'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');
    var angularObjectList = ['animation', 'config', 'constant', 'controller', 'directive', 'factory', 'filter', 'provider', 'service', 'value', 'decorator'];
    var configType = context.options[0];
    var messageByConfigType = {
        anonymous: 'Use anonymous functions instead of named function',
        named: 'Use named functions instead of anonymous function'
    };
    var message = messageByConfigType[configType];

    if (context.options[1]) {
        angularObjectList = context.options[1];
    }

    function checkType(arg) {
        return (configType === 'named' && (utils.isIdentifierType(arg) || utils.isNamedInlineFunction(arg))) ||
            (configType === 'anonymous' && utils.isFunctionType(arg) && !utils.isNamedInlineFunction(arg));
    }

    return {

        CallExpression: function(node) {
            var callee = node.callee;
            var angularObjectName = callee.property && callee.property.name;
            var firstArgument = node.arguments[1];

            if (utils.isAngularComponent(node) && callee.type === 'MemberExpression' && angularObjectList.indexOf(angularObjectName) >= 0) {
                if (checkType(firstArgument)) {
                    return;
                }

                if (utils.isArrayType(firstArgument)) {
                    var last = firstArgument.elements[firstArgument.elements.length - 1];
                    if (checkType(last)) {
                        return;
                    }
                }

                context.report(node, message, {});
            }
        }
    };
};

module.exports.schema = [{
    enum: [
        'named',
        'anonymous'
    ]
}, {
    type: 'array',
    items: {
        type: 'string'
    }
}];
