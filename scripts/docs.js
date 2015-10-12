'use strict';

var fs = require('fs');
var parseComments = require('parse-comments');
var _ = require('lodash');
var eslintAngularIndex = require('../index.js');

var templates = {
    ruleSourcePath: _.template('rules/<%= ruleName %>.js'),
    ruleDocumentationPath: _.template('docs/<%= ruleName %>.md'),
    ruleDocumentationContent: _.template('# <%= ruleName %>\n\n<%= description %>\n'),
    readmeRuleLine: _.template(' * [<%= ruleName %>](<%= documentationPath %>) - <%= linkDescription %>'),
    readmeRuleSectionContent: _.template('## Rules\n\n<%= content %>\n\n\n\n##')
};

var ruleNames = Object.keys(eslintAngularIndex.rules).filter(function(ruleName) {
    // filter legacy rules
    return !/^ng_/.test(ruleName);
});

function createRule(ruleName) {
    var rule = {
        ruleName: ruleName
    };
    rule.sourcePath = templates.ruleSourcePath(rule);
    rule.documentationPath = templates.ruleDocumentationPath(rule);

    var ruleComments = parseComments(fs.readFileSync(rule.sourcePath).toString());
    var mainComment = ruleComments[0];

    var descriptionLines = mainComment.description.trim().split(/\.\s+/g);
    rule.description = descriptionLines.join('.\n');

    if (mainComment.linkDescription) {
        rule.linkDescription = mainComment.linkDescription;
    } else {
        rule.linkDescription = descriptionLines[0];
    }

    return rule;
}

var docs = {
    rules: ruleNames.map(createRule),
    createDocFiles: function(cb) {
        this.rules.forEach(function(rule) {
            fs.writeFileSync(rule.documentationPath, templates.ruleDocumentationContent(rule));
        });
        (cb || _.noop)();
    },
    updateReadme: function(readmePath, cb) {
        var readmeRuleSection = templates.readmeRuleSectionContent({
            content: this.rules.map(templates.readmeRuleLine).join('\n')
        });

        var readmeContent = fs.readFileSync(readmePath).toString();

        // use split and join to prevent the replace() and dollar sign problem (http://stackoverflow.com/questions/9423722)
        var updatedReadmeContent = readmeContent.split(/## Rules[\S\s]*?##/).join(readmeRuleSection);

        fs.writeFileSync(readmePath, updatedReadmeContent);
        (cb || _.noop)();
    }
};

module.exports = docs;

// run as node script (global process for 0.12 compatibility)
if ((process || require('process')).mainModule !== undefined) {
    docs.createDocFiles();
    docs.updateReadme('README.md');
}
