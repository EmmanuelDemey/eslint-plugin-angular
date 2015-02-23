//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var variables = ['$scope', '$rootScope'];
var bad = ['$$childHead', '$$childTail', '$$prevSibling', '$$nextSibling', 
		'$$listeners', '$$phase', '$$watchers', '$$asyncQueue', '$$postDigestQueue', 
		'$$isolateBindings', '$$postDigest(function(){})', '$$destroyed'];
var invalid = [];

variables.forEach(function(variable){

	bad.forEach(function(b){
		invalid.push({
			code: variable + '.' + b,
			errors: [{ message: 'Using $$-prefixed Angular objects/methods are not recommended'}]
		});
	});
	
});

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_private_call', {
    valid: [
        '$scope.$apply(function(){})',
        '$rootScope.$apply(function(){})'
    ],
    invalid: invalid
});
