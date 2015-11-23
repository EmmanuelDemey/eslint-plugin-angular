'use strict';

var fs = require('fs');

var DEFAULT_FILE_ENDING = '.js';

function createFileEndingRegExp(fileEnding) {
    return new RegExp(fileEnding + '$');
}

module.exports = {
    getFiles: function(options) {
        var fileEnding = options.fileEnding || DEFAULT_FILE_ENDING;
        var fileEndingRegExp = createFileEndingRegExp(fileEnding);

        var files = fs.readdirSync(options.basePath).filter(function(filename) {
            return fileEndingRegExp.test(filename) && (options.ignoreFiles || []).indexOf(filename) < 0;
        });

        files.basePath = options.basePath;
        files.fileEnding = fileEnding;
        files.fileEndingRegExp = fileEndingRegExp;
        return files;
    },
    detectMissingFilesForRules: function(ruleNames, options) {
        var files = options.files;
        var basePath = files.basePath;
        ruleNames.forEach(function(ruleName) {
            var expectedFilename = ruleName + files.fileEnding;
            if (files.indexOf(expectedFilename) < 0) {
                throw new Error('Missing ' + options.type + ' "' + basePath + expectedFilename + '" for rule "' + ruleName + '"');
            }
        });
    },
    detectMissingRuleDefinitionForFiles: function(files, options) {
        var basePath = files.basePath;

        var ruleNames = options.ruleNames;
        files.forEach(function(fileName) {
            var expectedRulename = fileName.replace(files.fileEndingRegExp, '');
            if (ruleNames.indexOf(expectedRulename) < 0) {
                throw new Error('Missing rule definition "' + expectedRulename + '" for "' + basePath + fileName + '"');
            }
        });
    }
};
