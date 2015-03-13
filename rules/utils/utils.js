(function(){
	'use strict';

	//this will recursively grab the callee until it hits an Identifier
	function getCallingIdentifier(calleeObject) {
		if (calleeObject.type && calleeObject.type === 'Identifier') {
			return calleeObject;
		}
		return getCallingIdentifier(calleeObject.callee.object);
	}
	module.exports = {

		convertPrefixToRegex: function(prefix){
			if(typeof prefix !== 'string'){
				return prefix;
			}

			if(prefix[0] === '/' && prefix[prefix.length-1] === '/'){
				prefix = prefix.substring(1, prefix.length-2);
			}

			return new RegExp(prefix + '.*');
		},

		isTypeOfStatement: function(node){
			return node.type === 'Identifier' || (node.type === 'UnaryExpression' && node.operator === 'typeof');
		},

		isArrayType: function(node){
			return node !== undefined && node.type === 'ArrayExpression';
		},

		isFunctionType: function(node){
			return node !== undefined && node.type === 'FunctionExpression';
		},

		isIdentifierType: function(node){
			return node !== undefined && node.type === 'Identifier';
		},

		isLiteralType: function(node){
			return node !== undefined && node.type === 'Literal';
		},

		isEmptyFunction: function(fn){
			return fn.body.body.length === 0;
		},

		isRegexp: function(regexp){
			return toString.call(regexp) === '[object RegExp]';
		},

		isStringRegexp: function(string){
			return string[0] === '/' && string[string.length-1] === '/';
		},

		isAngularComponent: function(node){
			return node.arguments.length === 2 && this.isLiteralType(node.arguments[0]) && (this.isFunctionType(node.arguments[1]) || this.isArrayType(node.arguments[1]));
		},

		isAngularControllerDeclaration: function(node){
			return this.isAngularComponent(node) && node.callee.type === 'MemberExpression' && node.callee.property.name === 'controller'
		},

		isAngularFilterDeclaration: function(node){
			return this.isAngularComponent(node) && node.callee.type === 'MemberExpression' && node.callee.property.name === 'filter'
		},

		isAngularDirectiveDeclaration: function(node){
			return this.isAngularComponent(node) && node.callee.type === 'MemberExpression' && node.callee.property.name === 'directive'
		},

		isAngularServiceDeclaration: function(node){
			return this.isAngularComponent(node) && node.callee.type === 'MemberExpression'
				&& (node.callee.property.name === 'provider' || node.callee.property.name === 'service' || node.callee.property.name === 'factory' || node.callee.property.name === 'constant' || node.callee.property.name === 'value')
		},

		isAngularModuleDeclaration: function(node){
			return this.isAngularComponent(node) && node.callee.type === 'MemberExpression' && node.callee.property.name === 'module'
		},

		isRouteDefinition: function (node) {
			//the route def function is .when(), so when we find that, go up through the chain and make sure
			//$routeProvider is the calling object
			if (node.callee.property && node.callee.property.name === 'when') {
				var callObject = getCallingIdentifier(node.callee.object);
				return callObject.name === '$routeProvider';
			}
			return false;
		},

		isUIRouterStateDefinition: function (node) {
			//the state def function is .state(), so when we find that, go up through the chain and make sure
			//$stateProvider is the calling object
			if (node.callee.property && node.callee.property.name === 'state') {
				var callObject = getCallingIdentifier(node.callee.object);
				return callObject.name === '$stateProvider';
			}
			return false;
		}
	};
})();
