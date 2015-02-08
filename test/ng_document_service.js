//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_document_service', {
    valid: [
        '$document[0].title = ""'
    ],
    invalid: [
        { code: 'document.title', errors: [{ message: 'You should use the $document service instead of the default document object'}] },
        { code: 'window.document.title', errors: [{ message: 'You should use the $document service instead of the default document object'}] }
    ]
});
