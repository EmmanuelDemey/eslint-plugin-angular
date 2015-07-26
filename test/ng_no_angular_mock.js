//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_angular_mock', {
    valid: [
        'dump();',
        'inject();',
        'module();'
    ],
    invalid: [{
        code: 'angular.mock.dump();',
        errors: [{ message: 'You should use the "dump" method available in the window object.'}]
    }, {
        code: 'angular.mock.inject();',
        errors: [{ message: 'You should use the "inject" method available in the window object.'}]
    }, {
        code: 'angular.mock.module();',
        errors: [{ message: 'You should use the "module" method available in the window object.'}]
    }
    ]
});
