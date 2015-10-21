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
        if (rule.module.examples !== undefined) {
            var eslintTester = new RuleTester();
            eslintTester.run(rule.ruleName, rule.module, rule.examples);
        }
    });
}

function trimTrailingSpacesAndMultilineBreaks(content) {
    return content.replace(/( )+\n/g, '\n').replace(/\n\n+\n/g, '\n\n').replace(/\n+$/g, '\n');
}

function _normalizeExamples(example, valid) {
    if (_.isString(example)) {
        example = {
            code: example
        };
    } else {
        example = _.cloneDeep(example);
    }
    example.valid = valid;
    example.jsonOptions = example.options ? JSON.stringify(example.options) : '';

    if (example.errors && example.errors.length > 0) {
        example.errorMessage = example.errors[0].message;
    }
    return example;
}

function _prepareExamples(rule) {
    if (rule.module.examples === undefined) {
        console.error('No examples for ' + rule.ruleName);
        return '';
    }

    var validExamples = rule.examples.valid.map(_.partial(_normalizeExamples, _, true));
    var invalidExamples = rule.examples.invalid.map(_.partial(_normalizeExamples, _, false));

    var allExamples = validExamples.concat(invalidExamples);

    var groupedExamples = _.groupBy(allExamples, 'jsonOptions');

    return groupedExamples;
}


function _createRule(ruleName) {
    var rule = {
        ruleName: ruleName
    };
    rule.sourcePath = templates.ruleSourcePath(rule);
    rule.documentationPath = templates.ruleDocumentationPath(rule);

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

    rule.examples = !rule.module.examples ? null : {
        valid: rule.module.examples.valid || [],
        invalid: rule.module.examples.invalid || []
    };

    rule.examplesGroupedByConfiguration = _prepareExamples(rule);
    return rule;
}
