/**
 * require a consistent order of module dependencies
 *
 * Module dependencies should be sorted in a logical manner.
 * This rule provides two ways to sort modules, grouped or ungrouped.
 * In grouped mode the modules should be grouped in the order: standard modules - third party modules - custom modules.
 * The modules should be sorted alphabetically within its group.
 * A prefix can be specified to determine which prefix the custom modules have.
 * Without grouped set to `false` all dependencies combined should be sorted alphabetically.
 * ('module-dependency-order', [2, {grouped: true, prefix: "app"}])
 *
 * @version 0.12.0
 * @category conventions
 */
'use strict';

var utils = require('./utils/utils');

module.exports = function(context) {
    var options = context.options[0] || {};
    var groupedMode = options.grouped !== false;
    var moduleRegex;
    if (groupedMode) {
        moduleRegex = utils.convertPrefixToRegex(options.prefix);
    }

    var standard = [
        // Libraries in the angular.js repository
        'ng',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngLocale',
        'ngMessageFormat',
        'ngMessages',
        'ngMock',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',

        // Libraries maintained by the angular team, but in another repository
        'ngMaterial',
        'ngNewRouter'
    ];

    function checkLiteral(node) {
        if (node.type !== 'Literal') {
            context.report(node, 'Unexpected non-literal value');
            return false;
        }
        return true;
    }

    function checkCombined(deps) {
        var lastCorrect;
        deps.elements.forEach(function(node) {
            if (!checkLiteral(node)) {
                return;
            }
            var value = node.value;
            if (lastCorrect === undefined || lastCorrect.localeCompare(value) < 0) {
                lastCorrect = value;
            } else {
                context.report(node, '{{current}} should be sorted before {{last}}', {
                    current: value,
                    last: lastCorrect
                });
            }
        });
    }

    function isStandardModule(value) {
        return standard.indexOf(value) !== -1;
    }

    function isCustomModule(value) {
        return moduleRegex && moduleRegex.test(value);
    }

    function checkGrouped(deps) {
        var lastCorrect;
        var group = 'standard';
        deps.elements.forEach(function loop(node) {
            if (!checkLiteral(node)) {
                return;
            }
            var value = node.value;
            if (lastCorrect === undefined) {
                lastCorrect = value;
                if (isCustomModule(value)) {
                    group = 'custom';
                } else if (standard.indexOf(value) === -1) {
                    group = 'third party';
                }
                return;
            }
            if (group === 'standard') {
                if (isStandardModule(value)) {
                    if (lastCorrect.localeCompare(value) > 0) {
                        context.report(node, '{{current}} should be sorted before {{last}}', {
                            current: value,
                            last: lastCorrect
                        });
                    } else {
                        lastCorrect = value;
                    }
                } else {
                    if (isCustomModule(value)) {
                        group = 'custom';
                    } else {
                        group = 'third party';
                    }
                    lastCorrect = value;
                }
            }
            if (group === 'third party') {
                if (isStandardModule(value)) {
                    context.report(node, '{{current}} is a standard module and should be sorted before {{last}}', {
                        current: value,
                        last: lastCorrect
                    });
                } else if (isCustomModule(value)) {
                    group = 'custom';
                    lastCorrect = value;
                } else if (lastCorrect.localeCompare(value) > 0) {
                    context.report(node, '{{current}} should be sorted before {{last}}', {
                        current: value,
                        last: lastCorrect
                    });
                } else {
                    lastCorrect = value;
                }
            }
            if (group === 'custom') {
                if (isStandardModule(value)) {
                    context.report(node, '{{current}} is a standard module and should be sorted before {{last}}', {
                        current: value,
                        last: lastCorrect
                    });
                } else if (!isCustomModule(value)) {
                    context.report(node, '{{current}} is a third party module and should be sorted before {{last}}', {
                        current: value,
                        last: lastCorrect
                    });
                }
            }
        });
    }

    return {
        CallExpression: function(node) {
            if (!utils.isAngularModuleDeclaration(node)) {
                return;
            }
            var deps = node.arguments[1];
            if (deps.type !== 'ArrayExpression') {
                context.report(deps, 'Dependencies should be a literal array');
                return;
            }
            if (groupedMode) {
                checkGrouped(deps);
            } else {
                checkCombined(deps);
            }
        }
    };
};

module.exports.schema = [{
    type: 'object',
    properties: {
        grouped: {
            type: 'boolean'
        },
        prefix: {
            type: ['string', 'null']
        }
    }
}];
