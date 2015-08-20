module.exports = (function () {
    'use strict';

    var utils = require('./utils/utils');
    var path = require('path');
    var fileEnding = '.js';

    var typeSeparators = {
        dot: '.',
        dash: '-',
        underscore: '_'
    };

    var componentTypeMappings = {
        module: 'module',
        controller: 'controller',
        directive: 'directive',
        filter: 'filter',
        service: 'service',
        factory: 'service',
        provider: 'service',
        value: 'service',
        constant: 'constant'
    };

    var filenameUtil = {
        removeTypeSuffix: function (name, type) {
            var nameTypeLengthDiff = name.length - type.length;
            if (nameTypeLengthDiff <= 0) {
                return name;
            }
            var typeCamelCase = type[0].toUpperCase() + type.slice(1);
            if (name.indexOf(typeCamelCase) === nameTypeLengthDiff) {
                return name.slice(0, nameTypeLengthDiff);
            } else {
                return name;
            }
        },
        createExpectedName: function (name, type, options) {
            var typeSeparator = typeSeparators[options.typeSeparator];

            if (options.ignoreTypeSuffix) {
                name = filenameUtil.removeTypeSuffix(name, type);
            }

            if (typeSeparator !== undefined) {
                name = name + typeSeparator + type;
            }

            return name + fileEnding;
        }
    };

    return function (context) {
        var options = context.options[0] || {},
            filename = path.basename(context.getFilename());

        return {

            'CallExpression': function (node) {

                if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                    var name = node.arguments[0].value,
                        type = componentTypeMappings[node.callee.property.name],
                        expectedName;

                    if (type === undefined|| (type === 'service' && node.callee.object.name === '$provide')) {
                        return;
                    }

                    expectedName = filenameUtil.createExpectedName(name, type, options);

                    if (expectedName !== filename) {
                        context.report(node, 'Filename must be "{{expectedName}}"', {
                            expectedName: expectedName
                        });
                    }
                }
            }
        };
    }
}());
