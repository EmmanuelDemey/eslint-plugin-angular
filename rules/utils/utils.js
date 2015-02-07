(function(){
	'use strict';
	module.exports = {
		isArrayType: function(node){
			return node !== undefined && node.type === 'ArrayExpression';
		},

		isFunctionType: function(node){
			return node !== undefined && node.type === 'FunctionExpression';
		},

		isEmptyFunction: function(fn){
			return fn.body.body.length === 0;
		},

		isRegexp: function(regexp){
			return toString.call(regexp) === '[object RegExp]';
		}
	};
})();
