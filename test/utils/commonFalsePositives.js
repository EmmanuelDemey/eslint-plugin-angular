/**
 * Array of code snippets which are likely/known to be detected as false positives.
 */
'use strict';

module.exports = [
    'describe("", function () { });',
    'it("", function() {})',
    'dump();inject();module();',
    '"use strict";angular.module("")',
    'mocha.run();',
    'controller = el.controller();',
    {code: 'angular.module("m", [])', filename: 'm.js'},
    {code: 'var s = function () {};angular.module("").factory("s", s);', filename: 's.js'}
];
