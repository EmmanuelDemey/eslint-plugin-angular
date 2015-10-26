'use strict';

var fs = require('fs');
var parseComments = require('parse-comments');
var _ = require('lodash');
var eslintAngularIndex = require('../index.js');
var RuleTester = require('eslint').RuleTester;

var templates = require('./templates.js');

var ruleNames = Object.keys(eslintAngularIndex.rules).filter(function(ruleName) {
    // filter legacy rules
    return !/^ng_/.test(ruleName);
});

var docs = {
    rules: ruleNames.map(_createRule),
    createDocFiles: createDocFiles,
    updateReadme: updateReadme,
    testDocs: testDocs
};

module.exports = docs;

// run as node script (global process for 0.12 compatibility)
if ((process || require('process')).mainModule !== undefined) {
    docs.createDocFiles();
    docs.updateReadme('README.md');
    docs.testDocs();
}

function createDocFiles(cb) {
    this.rules.forEach(function(rule) {
        fs.writeFileSync(rule.documentationPath, trimTrailingSpacesAndMultilineBreaks(templates.ruleDocumentationContent(rule)));
    });
    (cb || _.noop)();
}

function updateReadme(readmePath, cb) {
    var readmeRuleSection = templates.readmeRuleSectionContent(this);
    var readmeContent = fs.readFileSync(readmePath).toString();

    // use split and join to prevent the replace() and dollar sign problem (http://stackoverflow.com/questions/9423722)
    var updatedReadmeContent = readmeContent.split(/## Rules[\S\s]*?----\n/).join(readmeRuleSection);

    fs.writeFileSync(readmePath, updatedReadmeContent);
    (cb || _.noop)();
}

function testDocs() {
    this.rules.forEach(function(rule) {
        if (rule.examples !== undefined) {
            var eslintTester = new RuleTester();
            eslintTester.run(rule.ruleName, rule.module, rule.examples);
        }
    });
}

function trimTrailingSpacesAndMultilineBreaks(content) {
    return content.replace(/( )+\n/g, '\n').replace(/\n\n+\n/g, '\n\n').replace(/\n+$/g, '\n');
}

function _parseConfigLine(configLine) {
    // surround config keys with quotes for json parsing
    var preparedConfigLine = configLine.replace(/(\w+):/g, '"$1":');
    var example = JSON.parse('{' + preparedConfigLine + '}');
    return example;
}

function _parseExample(exampleSource) {
    var lines = exampleSource.split('\n');
    var example = _parseConfigLine(lines[0]);
    example.code = lines.slice(1).join('\n').trim();

    if (example.errorMessage) {
        example.errors = [{
            message: example.errorMessage
        }];
    }
    example.jsonOptions = example.options ? JSON.stringify(example.options) : '';

    return example;
}

function _loadExamples(rule) {
    var examplesSource = fs.readFileSync(rule.examplesPath).toString();
    var exampleRegex = /\s*\/\/\s*example\s*-/;
    if (!exampleRegex.test(examplesSource)) {
        return [];
    }

    return examplesSource.split(exampleRegex).slice(1).map(_parseExample);
}

function _createRule(ruleName) {
    var rule = {
        ruleName: ruleName
    };
    rule.sourcePath = templates.ruleSourcePath(rule);
    rule.documentationPath = templates.ruleDocumentationPath(rule);
    rule.examplesPath = templates.ruleExamplesPath(rule);

    var ruleComments = parseComments(fs.readFileSync(rule.sourcePath).toString());
    var mainComment = ruleComments[0];

    rule.lead = mainComment.lead;

    // slice examples
    rule.description = mainComment.description.trim();

    if (mainComment.linkDescription) {
        rule.linkDescription = mainComment.linkDescription;
    } else {
        rule.linkDescription = mainComment.lead;
    }

    rule.module = require('../rules/' + rule.ruleName);
    rule.allExamples = _loadExamples(rule);

    rule.examples = {
        valid: _.filter(rule.allExamples, {valid: true}) || [],
        invalid: _.filter(rule.allExamples, {valid: false}) || []
    };

    rule.examplesGroupedByConfiguration = _.groupBy(rule.allExamples, 'jsonOptions');
    return rule;
}
