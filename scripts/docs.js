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

// create rule documentation objects from ruleNames
var rules = ruleNames.map(_createRule);

module.exports = {
    rules: rules,
    createDocFiles: createDocFiles,
    updateReadme: updateReadme,
    testDocs: testDocs
};

/**
 * Create a markdown documentation for each rule from rule comments and examples.
 *
 * @param cb callback
 */
function createDocFiles(cb) {
    this.rules.forEach(function(rule) {
        fs.writeFileSync(rule.documentationPath, _trimTrailingSpacesAndMultilineBreaks(templates.ruleDocumentationContent(rule)));
    });
    (cb || _.noop)();
}

/**
 * Update the rules section in the readme file.
 *
 * @param cb callback
 */
function updateReadme(readmePath, cb) {
    var readmeRuleSection = templates.readmeRuleSectionContent(this);
    var readmeContent = fs.readFileSync(readmePath).toString();

    // use split and join to prevent the replace() and dollar sign problem (http://stackoverflow.com/questions/9423722)
    var updatedReadmeContent = readmeContent.split(/## Rules[\S\s]*?----\n/).join(readmeRuleSection);

    fs.writeFileSync(readmePath, updatedReadmeContent);
    (cb || _.noop)();
}

/**
 * Test documentation examples.
 *
 * @param cb callback
 */
function testDocs(cb) {
    this.rules.forEach(function(rule) {
        if (rule.examples !== undefined) {
            var eslintTester = new RuleTester();
            eslintTester.run(rule.ruleName, rule.module, rule.examples);
        }
    });
    (cb || _.noop)();
}

function _trimTrailingSpacesAndMultilineBreaks(content) {
    return content.replace(/( )+\n/g, '\n').replace(/\n\n+\n/g, '\n\n').replace(/\n+$/g, '\n');
}

function _parseConfigLine(configLine) {
    // surround config keys with quotes for json parsing
    var preparedConfigLine = configLine.replace(/(\w+):/g, '"$1":').replace('\\:', ':');
    var example = JSON.parse('{' + preparedConfigLine + '}');
    return example;
}

function _parseExample(exampleSource) {
    var rule = this;
    var lines = exampleSource.split('\n');

    // parse first example line as config
    var example = _parseConfigLine(lines[0]);

    // other lines are the example code
    example.code = lines.slice(1).join('\n').trim();

    // wrap the errorMessage in the format needed for the eslint rule tester.
    if (example.errorMessage) {
        example.errors = [{message: example.errorMessage}];
    }

    // invalid examples require an errorMessage
    if (!example.valid && !example.errorMessage) {
        throw new Error('Example config requires "errorMessage" when valid: false');
    }

    // json options needed as group key
    example.jsonOptions = example.options ? JSON.stringify(example.options) : '';

    // use options for tests or default options of no options are configured
    if (example.options) {
        example.displayOptions = example.options;
    } else {
        // set default options for tests
        var defaultOptions = eslintAngularIndex.rulesConfig[rule.ruleName];
        if (_.isArray(defaultOptions)) {
            example.options = defaultOptions.slice(1);
        }
    }

    return example;
}

function _loadExamples(rule) {
    var examplesSource = fs.readFileSync(rule.examplesPath).toString();
    var exampleRegex = /\s*\/\/\s*example\s*-/;
    if (!exampleRegex.test(examplesSource)) {
        return [];
    }

    return examplesSource.split(exampleRegex).slice(1).map(_parseExample.bind(rule));
}

function _filterByValidity(examples, validity) {
    return _.filter(examples, {valid: validity}) || [];
}

function _appendGroupedExamplesByValidity(groupedExamples, examples, config, validity) {
    var examplesByValidity = _filterByValidity(examples, validity);
    if (examplesByValidity.length > 0) {
        groupedExamples.push({
            config: config,
            valid: validity,
            examples: examplesByValidity
        });
    }
}

function _createRule(ruleName) {
    // create basic rule object
    var rule = {
        ruleName: ruleName
    };

    // add paths
    rule.sourcePath = templates.ruleSourcePath(rule);
    rule.documentationPath = templates.ruleDocumentationPath(rule);
    rule.examplesPath = templates.ruleExamplesPath(rule);

    // parse rule comments
    var mainRuleComment = parseComments(fs.readFileSync(rule.sourcePath).toString())[0];

    // set lead, description, linkDescription and styleguideReferences
    rule.lead = mainRuleComment.lead;
    rule.description = mainRuleComment.description.trim();
    rule.linkDescription = mainRuleComment.linkDescription ? mainRuleComment.linkDescription : rule.lead;
    rule.styleguideReferences = mainRuleComment.styleguideReferences || [];
    rule.version = mainRuleComment.version;

    if (!rule.version) {
        throw new Error('No @version found for ' + ruleName);
    }

    // load rule module for tests
    rule.module = require('../rules/' + rule.ruleName);

    // load examples, prepare them for the tests and group the for the template
    rule.allExamples = _loadExamples(rule);
    rule.examples = {
        valid: _filterByValidity(rule.allExamples, true),
        invalid: _filterByValidity(rule.allExamples, false)
    };

    rule.groupedExamples = [];
    var examplesGroupedByConfig = _.groupBy(rule.allExamples, 'jsonOptions');
    _.each(examplesGroupedByConfig, function(examples, config) {
        // append invalid examples if existing
        _appendGroupedExamplesByValidity(rule.groupedExamples, examples, config, false);

        // append valid examples if existing
        _appendGroupedExamplesByValidity(rule.groupedExamples, examples, config, true);
    });
    rule.hasOnlyOneConfig = Object.keys(examplesGroupedByConfig).length === 1;

    return rule;
}
