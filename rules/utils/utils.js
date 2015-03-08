(function(){
	'use strict';
	module.exports = {

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
	};
})();
