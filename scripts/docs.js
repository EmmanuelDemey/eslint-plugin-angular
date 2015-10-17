'use strict';

var fs = require('fs');
var parseComments = require('parse-comments');
var _ = require('lodash');
var eslintAngularIndex = require('../index.js');
var RuleTester = require('eslint').RuleTester;

var templates = {
    ruleSourcePath: _.template('rules/<%= ruleName %>.js'),
    ruleDocumentationPath: _.template('docs/<%= ruleName %>.md'),
    ruleDocumentationContent: _.template('# <%= ruleName %> - <%= lead %>\n\n<%= description %>\n\n<%= formattedExamples %>\n'),
    ruleFormattedExamples: _.template('## Examples\n\n<%= formattedExamples %>'),
    ruleFormattedExample: _.template('// <%= valid %> <%= filename %>\n<%= code %> <%= errorMessage %>'),
    readmeRuleLine: _.template(' * [<%= ruleName %>](<%= documentationPath %>) - <%= linkDescription %>'),
    readmeRuleSectionContent: _.template('## Rules\n\n<%= content %>\n\n\n\n##')
};

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
        fs.writeFileSync(rule.documentationPath, templates.ruleDocumentationContent(rule));
    });
    (cb || _.noop)();
}

function updateReadme(readmePath, cb) {
    var readmeRuleSection = templates.readmeRuleSectionContent({
        content: this.rules.map(templates.readmeRuleLine).join('\n')
    });

    var readmeContent = fs.readFileSync(readmePath).toString();

    // use split and join to prevent the replace() and dollar sign problem (http://stackoverflow.com/questions/9423722)
    var updatedReadmeContent = readmeContent.split(/## Rules[\S\s]*?##/).join(readmeRuleSection);

    fs.writeFileSync(readmePath, updatedReadmeContent);
    (cb || _.noop)();
}

function testDocs() {
    this.rules.forEach(function(rule) {
        if (rule.module.examples !== undefined) {
            var eslintTester = new RuleTester();
            eslintTester.run(rule.ruleName, rule.module, rule.module.examples);
        }
    });
}

function _formatExampleFromRule(rule) {
    if (rule.module.examples === undefined) {
        console.error('No examples for ' + rule.ruleName);
        return '';
    }

    var validExamples = (rule.module.examples.valid || []).map(_.partial(_normalizeExamples, _, true));
    var invalidExamples = (rule.module.examples.invalid || []).map(_.partial(_normalizeExamples, _, false));

    var allExamples = validExamples.concat(invalidExamples);

    allExamples.forEach(_setFormattedExample);

    var groupedExamples = _.groupBy(allExamples, 'formattedOptions');

    var formattedExamples = '';
    _.each(groupedExamples, function(examples, config) {
        if (config) {
            formattedExamples += 'Examples with the configuration ' + config;
        } else {
            formattedExamples += 'Examples with the default configuration';
        }

        var commentConfig = !examples[0].options ? 2 : JSON.stringify([2].concat(examples[0].options));

        formattedExamples += '\n\n';
        formattedExamples += '    /*eslint angular/' + rule.ruleName + ': ' + commentConfig + '*/\n\n';
        formattedExamples += examples.map(function(example) {
            return '    ' + example.formatted.replace(/\n/g, '\n    ');
        }).join('\n\n');
        formattedExamples += '\n\n';
    });

    return templates.ruleFormattedExamples({
        formattedExamples: formattedExamples
    });
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
    example.formattedOptions = !example.options ? '' : '`' + example.options.map(JSON.stringify).join('` and `') + '`';

    if (example.errors && example.errors.length > 0) {
        example.errorMesssage = example.errors[0].message;
    }
    return example;
}

function _setFormattedExample(example) {
    example.formatted = templates.ruleFormattedExample({
        valid: example.valid ? 'valid' : 'invalid',
        filename: !example.filename ? '' : 'with filename: ' + example.filename + '',
        code: _.isObject(example) ? example.code : example,
        errorMessage: !example.errorMessage ? '' : '// error: ' + example.errorMessage
    });
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

    rule.formattedExamples = _formatExampleFromRule(rule);
    return rule;
}
