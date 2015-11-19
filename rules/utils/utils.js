'use strict';

var _ = require('lodash');

var scopeProperties = [
    '$id',
    '$parent',
    '$root',
    '$destroy',
    '$broadcast',
    '$emit',
    '$on',
    '$applyAsync',
    '$apply',
    '$evalAsync',
    '$eval',
    '$digest',
    '$watchCollection',
    '$watchGroup',
    '$watch',
    '$new'
];


module.exports = {
    // Properties
    scopeProperties: scopeProperties,

    // Functions
    convertPrefixToRegex: convertPrefixToRegex,
    convertStringToRegex: convertStringToRegex,
    isTypeOfStatement: isTypeOfStatement,
    isToStringStatement: isToStringStatement,
    isArrayType: isArrayType,
    isFunctionType: isFunctionType,
    isNamedInlineFunction: isNamedInlineFunction,
    isIdentifierType: isIdentifierType,
    isMemberExpression: isMemberExpression,
    isLiteralType: isLiteralType,
    isEmptyFunction: isEmptyFunction,
    isRegexp: isRegexp,
    isStringRegexp: isStringRegexp,
    isAngularComponent: isAngularComponent,
    isAngularControllerDeclaration: isAngularControllerDeclaration,
    isAngularFilterDeclaration: isAngularFilterDeclaration,
    isAngularDirectiveDeclaration: isAngularDirectiveDeclaration,
    isAngularServiceDeclaration: isAngularServiceDeclaration,
    isAngularModuleDeclaration: isAngularModuleDeclaration,
    isAngularModuleGetter: isAngularModuleGetter,
    isAngularRunSection: isAngularRunSection,
    isAngularConfigSection: isAngularConfigSection,
    isRouteDefinition: isRouteDefinition,
    isUIRouterStateDefinition: isUIRouterStateDefinition,
    findIdentiferInScope: findIdentiferInScope,
    getControllerDefinition: getControllerDefinition,
    getFunctionDeclaration: getFunctionDeclaration
};


/**
 * Recursively grab the callee until an Identifier is found.
 *
 * @todo Needs better documentation.
 */
function getCallingIdentifier(calleeObject) {
    if (calleeObject.type && calleeObject.type === 'Identifier') {
        return calleeObject;
    }
    if (calleeObject.callee && calleeObject.callee.object) {
        return getCallingIdentifier(calleeObject.callee.object);
    }
    return null;
}

/**
 * Convert a prefix string to a RegExp.
 *
 * `'/app/'` → `/app.*\/`
 *
 * @param {string} prefix
 * @returns {RegExp}
 */
function convertPrefixToRegex(prefix) {
    if (typeof prefix !== 'string') {
        return prefix;
    }

    if (prefix[0] === '/' && prefix[prefix.length - 1] === '/') {
        prefix = prefix.substring(1, prefix.length - 2);
    }

    return new RegExp(prefix + '.*');
}

/**
 * Convert a string to a RegExp.
 *
 * `'app'` → `/app/`
 * `'/app/'` → `/app/`
 *
 * @param {string} prefix
 * @returns {RegExp}
 */
function convertStringToRegex(string) {
    if (string[0] === '/' && string[string.length - 1] === '/') {
        string = string.substring(1, string.length - 2);
    }
    return new RegExp(string);
}

/**
 * @todo Missing documentation
 */
function isTypeOfStatement(node) {
    return node.type === 'Identifier' || (node.type === 'UnaryExpression' && node.operator === 'typeof');
}

/**
 * @todo Missing documentation
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is a `toString` statement.
 */
function isToStringStatement(node) {
    return node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.type === 'MemberExpression' &&
        node.callee.object.property.name === 'toString' &&
        node.callee.property.name === 'call' &&
        node.callee.object.object.type === 'MemberExpression' &&
        node.callee.object.object.object.name === 'Object' &&
        node.callee.object.object.property.name === 'prototype';
}

/**
 * Check whether or not a node is an ArrayExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ArrayExpression.
 */
function isArrayType(node) {
    return node !== undefined && node.type === 'ArrayExpression';
}

/**
 * Check whether or not a node is an FunctionExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an FunctionExpression.
 */
function isFunctionType(node) {
    return node !== undefined && node.type === 'FunctionExpression';
}

/**
 * Check whether or not a node is an named FunctionExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an named FunctionExpression.
 */
function isNamedInlineFunction(node) {
    return this.isFunctionType(node) && node.id && node.id.name && node.id.name.length > 0;
}

/**
 * Check whether or not a node is an Identifier.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an Identifier.
 */
function isIdentifierType(node) {
    return node !== undefined && node.type === 'Identifier';
}

/**
 * Check whether or not a node is an MemberExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an MemberExpression.
 */
function isMemberExpression(node) {
    return node !== undefined && node.type === 'MemberExpression';
}

/**
 * Check whether or not a node is an Literal.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an Literal.
 */
function isLiteralType(node) {
    return node !== undefined && node.type === 'Literal';
}

/**
 * Check whether or not a node is an isEmptyFunction.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an isEmptyFunction.
 */
function isEmptyFunction(fn) {
    return fn.body.body.length === 0;
}

/**
 * Check whether or not an object is a RegExp object.
 *
 * @param regexp The object for which to check if it is a RegExp object.
 * @returns {boolean} Shether or not an object is a RegExp object.
 */
function isRegexp(regexp) {
    return toString.call(regexp) === '[object RegExp]';
}

/**
 * Check whether or not a string resembles a regular expression.
 *
 * A string is considered a regular expression if it starts and ends with `/`.
 *
 * @param {string} The string to check.
 * @returns {boolean} Whether or not a string resembles a regular expression.
 */
function isStringRegexp(string) {
    return string[0] === '/' && string[string.length - 1] === '/';
}

/**
 * Check if a CallExpression node somewhat resembles an Angular component.
 *
 * The following are considered Angular components
 * ```js
 * app.factory('kittenService', function() {})
 *     ^^^^^^^
 * app.factory('kittenService', kittenService)
 *     ^^^^^^^
 * app.factory('kittenService', [])
 *     ^^^^^^^
 * asyncFn('value', callback)
 * ^^^^^^^
 * ```
 *
 * @todo FIXME
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node somewhat resembles an Angular component.
 */
function isAngularComponent(node) {
    return node.arguments !== undefined &&
        node.arguments.length === 2 &&
        isLiteralType(node.arguments[0]) &&
        (isIdentifierType(node.arguments[1]) ||
         isFunctionType(node.arguments[1]) ||
         isArrayType(node.arguments[1]));
}

/**
 * Check whether a CallExpression node defines an Angular controller.
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular controller.
 */
function isAngularControllerDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'controller';
}

/**
 * Check whether a CallExpression node defines an Angular filter.
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular filter.
 */
function isAngularFilterDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'filter';
}

/**
 * Check whether a CallExpression node defines an Angular directive.
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular directive.
 */
function isAngularDirectiveDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'directive';
}

/**
 * Check whether a node defines an Angular service.
 *
 * The following are considered services
 * ```js
 * app.provider('kittenServiceProvider', function() {})
 *     ^^^^^^^^
 * app.factory('kittenService', function() {})
 *     ^^^^^^^
 * app.service('kittenService', function() {})
 *     ^^^^^^^
 * app.constant('KITTENS', function() {})
 *     ^^^^^^^^
 * app.value('KITTENS', function() {})
 *     ^^^^^
 * ```
 *
 * The following are not considered services
 * ```js
 * $provide.factory('kittenService', function() {})
 * app.constant('KITTENS', 'meow')
 * app.value('KITTENS', 'purr')
 * this.$get = function() {}
 * ```
 *
 * @todo FIXME
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular controller.
 */
function isAngularServiceDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.object.name !== '$provide' &&
        (node.callee.property.name === 'provider' ||
         node.callee.property.name === 'service' ||
         node.callee.property.name === 'factory' ||
         node.callee.property.name === 'constant' ||
         node.callee.property.name === 'value');
}

/**
 * Check whether a CallExpression node declares an Angular module.
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node declares an Angular module.
 */
function isAngularModuleDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'module';
}

/**
 * Check whether a CallExpression node gets or declares an Angular module.
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node gets or declares an Angular module.
 */
function isAngularModuleGetter(node) {
    return node.arguments !== undefined &&
        node.arguments.length > 0 &&
        (isLiteralType(node.arguments[0]) || isIdentifierType(node.arguments[0])) &&
        node.callee.type === 'MemberExpression' &&
        node.callee.property.name === 'module';
}

/**
 * Check whether a CallExpression node defines an Angular run function.
 *
 * The following are considered run functions
 * ```js
 * app.run()
 *     ^^^
 * app.run(function() {})
 *     ^^^
 * ```
 *
 * The following are not considered run functions
 * ```js
 * angular.module('myApp').run(function() {})
 * angular.module('myApp', []).run(function() {})
 * mocha.run()
 * ```
 *
 * @todo FIXME
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular run function.
 */
function isAngularRunSection(node) {
    return isMemberExpression(node.callee) &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'run' &&
        (node.callee.object.type === 'Identifier' &&
         node.callee.object.name !== 'mocha');
}

/**
 * Check whether a CallExpression node defines an Angular config function.
 *
 * The following are considered config functions
 * ```js
 * app.config()
 *     ^^^^^^
 * app.config(function() {})
 *     ^^^^^^
 * ```
 *
 * The following are not considered run functions
 * ```js
 * angular.module('myApp').config(function() {})
 * angular.module('myApp', []).config(function() {})
 * ```
 *
 * @todo FIXME
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines an Angular config function.
 */
function isAngularConfigSection(node) {
    return isMemberExpression(node.callee) &&
     node.callee.property.type === 'Identifier' &&
     node.callee.property.name === 'config';
}

/**
 * Check whether a CallExpression node defines a route using $routeProvider.
 *
 * The following are considered routes:
 * ```js
 * $routeProvider.when()
 *                ^^^^
 * ```
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines a route.
 */
function isRouteDefinition(node) {
    // the route def function is .when(), so when we find that, go up through the chain and make sure
    // $routeProvider is the calling object
    if (node.callee.property && node.callee.property.name === 'when') {
        var callObject = getCallingIdentifier(node.callee.object);
        return callObject && callObject.name === '$routeProvider';
    }
    return false;
}

/**
 * Check whether a CallExpression node defines a state using $stateProvider.
 *
 * The following are considered states:
 * ```js
 * $stateProvider.state()
 *                ^^^^^
 * ```
 *
 * @param {Object} node The CallExpression node to check.
 * @returns {boolean} Whether or not the node defines a state.
 */
function isUIRouterStateDefinition(node) {
    // the state def function is .state(), so when we find that, go up through the chain and make sure
    // $stateProvider is the calling object
    if (node.callee.property && node.callee.property.name === 'state') {
        var callObject = getCallingIdentifier(node.callee.object);
        return callObject && callObject.name === '$stateProvider';
    }
    return false;
}

/**
 * Find an identifier node in the current scope.
 *
 * @param {Object} context The context to use to get the scope.
 * @param {Object} identifier The identifier node to look up.
 *
 * @returns {Object} The node declaring the identifier.
 */
function findIdentiferInScope(context, identifier) {
    var identifierNode = null;
    context.getScope().variables.forEach(function(variable) {
        if (variable.name === identifier.name) {
            identifierNode = variable.defs[0].node;
            if (identifierNode.type === 'VariableDeclarator') {
                identifierNode = identifierNode.init;
            }
        }
    });
    return identifierNode;
}

/**
 * Find the function definition of a controller in the current context.
 *
 * @param {Object} context The context to use to find the controller declaration.
 * @param {Object} node The Angular controller call to look up the declaration for.
 *
 * @returns {Object} The identifier declaring the controller function.
 */
function getControllerDefinition(context, node) {
    var controllerArg = node.arguments[1];

    // Three ways of creating a controller function: function expression,
    // variable name that references a function, and an array with a function
    // as the last item
    if (isFunctionType(controllerArg)) {
        return controllerArg;
    }
    if (isArrayType(controllerArg)) {
        controllerArg = controllerArg.elements[controllerArg.elements.length - 1];

        if (isIdentifierType(controllerArg)) {
            return findIdentiferInScope(context, controllerArg);
        }
        return controllerArg;
    }
    if (isIdentifierType(controllerArg)) {
        return findIdentiferInScope(context, controllerArg);
    }
}

function findFunctionDeclarationByDeclaration(body, fName) {
    return _.find(body, function(item) {
        return item.type === 'FunctionDeclaration' && item.id.name === fName;
    });
}

function findFunctionDeclarationByVariableDeclaration(body, fName) {
    var fn;
    _.forEach(body, function(item) {
        if (fn) {
            return;
        }
        if (item.type === 'VariableDeclaration') {
            _.forEach(item.declarations, function(declaration) {
                if (declaration.type === 'VariableDeclarator' &&
                    declaration.id &&
                    declaration.id.name === fName &&
                    declaration.init &&
                    declaration.init.type === 'FunctionExpression'
                ) {
                    fn = declaration.init;
                }
            });
        }
    });
    return fn;
}

function getFunctionDeclaration(node, fName) {
    if (node.type === 'BlockStatement' || node.type === 'Program') {
        if (node.body) {
            var fn = findFunctionDeclarationByDeclaration(node.body, fName);
            if (fn) {
                return fn;
            }
            fn = findFunctionDeclarationByVariableDeclaration(node.body, fName);
            if (fn) {
                return fn;
            }
        }
    }
    if (node.parent) {
        return getFunctionDeclaration(node.parent, fName);
    }
}
