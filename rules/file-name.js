/**
 * require and specify a consistent component name pattern
 *
 * All your file names should match the angular component name.
 * The second parameter can be a config object [2, {nameStyle: 'dash', typeSeparator: 'dot', ignoreTypeSuffix: true, ignorePrefix: 'ui'}] to match 'avenger-profile.directive.js' or 'avanger-api.service.js'.
 * Possible values for 'typeSeparator' and 'nameStyle' are 'dot', 'dash' and 'underscore'.
 * The options 'ignoreTypeSuffix' ignores camel cased suffixes like 'someController' or 'myService' and 'ignorePrefix' ignores namespace prefixes like 'ui'.
 *
 * The naming scheme is &lt;componentName&gt;&lt;typeSeparator&gt;&lt;componentType&gt;.js
 *
 * The *componentType* for all service types (service, factory, provider, value) is 'service'.
 * Since 1.5.0 it is possible to configure custom mappings for the *componentType*: {typeSeparator: 'dot', componentTypeMappings: {factory: 'factory', provider: 'provider'}.
 *
 * @styleguideReference {johnpapa} `y120` Naming - Naming Guidelines
 * @styleguideReference {johnpapa} `y121` Naming - Feature File Names
 * @version 0.7.0
 * @category naming
 * @sinceAngularVersion 1.x
 */
'use strict';

var path = require('path');

var utils = require('./utils/utils');

module.exports = {
    meta: {
        schema: [{
            type: ['object']
        }]
    },
    create: (function() {
        var fileEnding = '.js';

        var separators = {
            dot: '.',
            dash: '-',
            underscore: '_'
        };

        function createComponentTypeMappings(options) {
            var componentTypeMappingOptions = options.componentTypeMappings || {};

            return {
                module: componentTypeMappingOptions.module || 'module',
                controller: componentTypeMappingOptions.controller || 'controller',
                directive: componentTypeMappingOptions.directive || 'directive',
                filter: componentTypeMappingOptions.filter || 'filter',
                service: componentTypeMappingOptions.service || 'service',
                factory: componentTypeMappingOptions.factory || 'service',
                provider: componentTypeMappingOptions.provider || 'service',
                value: componentTypeMappingOptions.value || 'service',
                constant: componentTypeMappingOptions.constant || 'constant',
                component: componentTypeMappingOptions.component || 'component'
            };
        }

        var filenameUtil = {
            firstToUpper: function(value) {
                return value[0].toUpperCase() + value.slice(1);
            },
            firstToLower: function(value) {
                return value[0].toLowerCase() + value.slice(1);
            },
            removeTypeSuffix: function(name, type) {
                var nameTypeLengthDiff = name.length - type.length;
                if (nameTypeLengthDiff <= 0) {
                    return name;
                }
                var typeCamelCase = this.firstToUpper(type);
                if (name.indexOf(typeCamelCase) === nameTypeLengthDiff) {
                    return name.slice(0, nameTypeLengthDiff);
                }
                return name;
            },
            removePrefix: function(name, options) {
                var regName = '^' + options.ignorePrefix.replace(/[\.]/g, '\\$&');
                regName += options.ignorePrefix.indexOf('\.') === -1 ? '[A-Z]' : '[a-zA-z]';
                if (new RegExp(regName).test(name)) {
                    return this.firstToLower(name.slice(options.ignorePrefix.length));
                }
                return name;
            },
            transformComponentName: function(name, options) {
                var nameStyle = options.nameStyle;
                var nameSeparator = separators[nameStyle];
                if (nameSeparator) {
                    var replacement = '$1' + nameSeparator + '$2';
                    name = name.replace(/([a-z0-9])([A-Z])/g, replacement).toLowerCase();
                }
                return name;
            },
            createExpectedName: function(name, type, options) {
                var typeSeparator = separators[options.typeSeparator];

                if (options.ignoreTypeSuffix) {
                    name = filenameUtil.removeTypeSuffix(name, type);
                }
                if (options.ignorePrefix && options.ignorePrefix.length > 0) {
                    name = filenameUtil.removePrefix(name, options);
                }
                if (options.nameStyle) {
                    name = filenameUtil.transformComponentName(name, options);
                }
                if (typeSeparator !== undefined) {
                    name = name + typeSeparator + type;
                }
                return name + fileEnding;
            }
        };

        return function(context) {
            var options = context.options[0] || {};
            var filename = path.basename(context.getFilename());
            var componentTypeMappings = createComponentTypeMappings(options);

            return {
                CallExpression: function(node) {
                    if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                        var name = node.arguments[0].value;
                        var type = componentTypeMappings[node.callee.property.name];
                        var expectedName;

                        if (type === undefined || (type === 'service' && node.callee.object.name === '$provide')) {
                            return;
                        }

                        if (!name) {
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
        };
    }())
};
