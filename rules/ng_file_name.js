module.exports = function (context) {
    'use strict';

    var utils = require('./utils/utils');
    var path = require('path');
    var fileEnding = '.js';

    var options = context.options[0] || {},
        filePath = context.getFilename(),
        filename = filenameFromPath(filePath);

    function filenameFromPath(filePath) {
        return filePath.split(path.sep).splice(-1)[0];
    }

    var typeSeparators = {
        dot: '.',
        dash: '-',
        underscore: '_'
    };

    function passName(name) {
        return name;
    }

    function removeTypeSuffix(name, type) {
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
    }

    function createExpectedNameFn(options) {
        var typeSeparatorOption = options.typeSeparator;
        var typeSeparatorSeparator = typeSeparators[typeSeparatorOption];
        var ignoreTypeSuffix = !!options.ignoreTypeSuffix;

        var transformFileName = ignoreTypeSuffix ? removeTypeSuffix : passName;

        if (typeSeparatorOption === 'none' || typeSeparatorSeparator === undefined) {
            return function (name, type) {
                return transformFileName(name, type) + fileEnding;
            }
        } else {
            return function (name, type) {
                return transformFileName(name, type) + typeSeparatorSeparator + type + fileEnding;
            }
        }
    }

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

    var expectedNameFn = createExpectedNameFn(options);

    return {

        'CallExpression': function (node) {

            if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                var name = node.arguments[0].value,
                    type = componentTypeMappings[node.callee.property.name],
                    expectedName;

                if (!type) {
                    return;
                }
                if (type === 'service' && node.callee.object.name === '$provide') {
                    return;
                }

                expectedName = expectedNameFn(name, type);

                if (expectedName !== filename) {
                    context.report(node, 'Filename must be "{{expectedName}}"', {
                        path: filePath,
                        expectedName: expectedName
                    });
                }
            }
        }
    };
};
