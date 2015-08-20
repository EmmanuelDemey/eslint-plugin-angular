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

    function createExpectedNameFn(options) {
        var typeSuffixOption = options.typeSuffix;
        var typeSuffixSeparator = typeSeparators[typeSuffixOption];

        if (typeSuffixOption === 'none' || typeSuffixSeparator === undefined) {
            return function (name) {
                return name + fileEnding;
            }
        } else {
            return function (name, type) {
                return name + typeSuffixSeparator + type + fileEnding;
            }
        }
    }

    var expectedNameFn = createExpectedNameFn(options);

    return {

        'CallExpression': function (node) {

            if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                var name = node.arguments[0].value,
                    type = node.callee.property.name,
                    expectedName;

                if (type === 'provider' || type === 'service' || type === 'factory' || type === 'constant' || type === 'value') {
                    if (node.callee.object.name === '$provide') {
                        return;
                    }
                    type = 'service';
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
