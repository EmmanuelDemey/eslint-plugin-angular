'use strict';

var eslintAngularIndex = require('../index.js');
var testUtils = require('./utils/testUtils.js');

var ruleNames = Object.keys(eslintAngularIndex.rules).filter(function(ruleName) {
    // filter legacy rules
    return !/^ng_/.test(ruleName);
});

// ----- rules -----
var ruleFiles = testUtils.getFiles({
    basePath: './rules/',
    ignoreFiles: ['index.js', 'utils']
});

testUtils.detectMissingFilesForRules(ruleNames, {
    type: 'file',
    files: ruleFiles
});

testUtils.detectMissingRuleDefinitionForFiles(ruleFiles, {
    ruleNames: ruleNames
});

// ----- tests  -----
var testFiles = testUtils.getFiles({
    basePath: './test/',
    ignoreFiles: ['index.js', 'utils']
});

testUtils.detectMissingFilesForRules(ruleNames, {
    type: 'test',
    files: testFiles
});

testUtils.detectMissingRuleDefinitionForFiles(testFiles, {
    ruleNames: ruleNames
});

// ----- docs -----
var docFiles = testUtils.getFiles({
    basePath: './docs/',
    fileEnding: '.md'
});

testUtils.detectMissingFilesForRules(ruleNames, {
    type: 'docs',
    files: docFiles,
    fileEnding: '.md'
});

testUtils.detectMissingRuleDefinitionForFiles(docFiles, {
    ruleNames: ruleNames,
    fileEnding: '.md'
});
