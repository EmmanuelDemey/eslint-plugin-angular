//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_log', {
    valid: [
        '$log.log("log")',
        '$log.info("log")',
        '$log.warn("log")',
        '$log.error("log")',
        '$log.debug("log")'
    ],
    invalid: [
        { code: 'console.log("log")', errors: [{ message: 'You should use the "log" method of the AngularJS Service $log instead of the console object'}] },
        { code: 'console.debug("log")', errors: [{ message: 'You should use the "debug" method of the AngularJS Service $log instead of the console object'}] },
        { code: 'console.error("log")', errors: [{ message: 'You should use the "error" method of the AngularJS Service $log instead of the console object'}] },
        { code: 'console.info("log")', errors: [{ message: 'You should use the "info" method of the AngularJS Service $log instead of the console object'}] },
        { code: 'console.warn("log")', errors: [{ message: 'You should use the "warn" method of the AngularJS Service $log instead of the console object'}] }
    ]
});
