//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/no-private-call'),
	RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();

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

eslintTester.run('no-private-call', rule, {
    valid: [
        '$scope.$apply(function(){})',
        '$rootScope.$apply(function(){})'
    ],
    invalid: invalid
});
