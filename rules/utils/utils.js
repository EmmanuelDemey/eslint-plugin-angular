'use strict';


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
    getControllerDefinition: getControllerDefinition
};


// this will recursively grab the callee until it hits an Identifier
function getCallingIdentifier(calleeObject) {
    if (calleeObject.type && calleeObject.type === 'Identifier') {
        return calleeObject;
    }
    if (calleeObject.callee && calleeObject.callee.object) {
        return getCallingIdentifier(calleeObject.callee.object);
    }
    return null;
}

function convertPrefixToRegex(prefix) {
    if (typeof prefix !== 'string') {
        return prefix;
    }

    if (prefix[0] === '/' && prefix[prefix.length - 1] === '/') {
        prefix = prefix.substring(1, prefix.length - 2);
    }

    return new RegExp(prefix + '.*');
}

function convertStringToRegex(string) {
    if (string[0] === '/' && string[string.length - 1] === '/') {
        string = string.substring(1, string.length - 2);
    }
    return new RegExp(string);
}

function isTypeOfStatement(node) {
    return node.type === 'Identifier' || (node.type === 'UnaryExpression' && node.operator === 'typeof');
}

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

function isArrayType(node) {
    return node !== undefined && node.type === 'ArrayExpression';
}

function isFunctionType(node) {
    return node !== undefined && node.type === 'FunctionExpression';
}

function isIdentifierType(node) {
    return node !== undefined && node.type === 'Identifier';
}

function isMemberExpression(node) {
    return node !== undefined && node.type === 'MemberExpression';
}

function isLiteralType(node) {
    return node !== undefined && node.type === 'Literal';
}

function isEmptyFunction(fn) {
    return fn.body.body.length === 0;
}

function isRegexp(regexp) {
    return toString.call(regexp) === '[object RegExp]';
}

function isStringRegexp(string) {
    return string[0] === '/' && string[string.length - 1] === '/';
}

function isAngularComponent(node) {
    return node.arguments !== undefined && node.arguments.length === 2 && isLiteralType(node.arguments[0]) && (isIdentifierType(node.arguments[1]) || isFunctionType(node.arguments[1]) || isArrayType(node.arguments[1]));
}

function isAngularControllerDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'controller';
}

function isAngularFilterDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'filter';
}

function isAngularDirectiveDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'directive';
}

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

function isAngularModuleDeclaration(node) {
    return isAngularComponent(node) &&
        isMemberExpression(node.callee) &&
        node.callee.property.name === 'module';
}

function isAngularModuleGetter(node) {
    return node.arguments !== undefined &&
        node.arguments.length > 0 &&
        isLiteralType(node.arguments[0]) &&
        node.callee.type === 'MemberExpression' &&
        node.callee.property.name === 'module';
}

function isAngularRunSection(node) {
    return isMemberExpression(node.callee) &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'run' &&
        (node.callee.object.type === 'Identifier' &&
         node.callee.object.name !== 'mocha');
}

function isAngularConfigSection(node) {
    return isMemberExpression(node.callee) &&
     node.callee.property.type === 'Identifier' &&
     node.callee.property.name === 'config';
}

function isRouteDefinition(node) {
    // the route def function is .when(), so when we find that, go up through the chain and make sure
    // $routeProvider is the calling object
    if (node.callee.property && node.callee.property.name === 'when') {
        var callObject = getCallingIdentifier(node.callee.object);
        return callObject && callObject.name === '$routeProvider';
    }
    return false;
}

function isUIRouterStateDefinition(node) {
    // the state def function is .state(), so when we find that, go up through the chain and make sure
    // $stateProvider is the calling object
    if (node.callee.property && node.callee.property.name === 'state') {
        var callObject = getCallingIdentifier(node.callee.object);
        return callObject && callObject.name === '$stateProvider';
    }
    return false;
}

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
