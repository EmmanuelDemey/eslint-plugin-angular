(function () {
    var eslintAngularIndex = require('../index.js'),
        fs = require("fs");

    module.exports = {
        getFiles: function (options) {
            var files = fs.readdirSync(options.basePath).filter(function (filename) {
                return options.ignoreFiles.indexOf(filename) < 0;
            });
            files.basePath = options.basePath;
            return files;
        },
        detectMissingFilesForRules: function (ruleNames, options) {
            var files = options.files;
            var basePath = files.basePath;
            ruleNames.forEach(function (ruleName) {
                var expectedFilename = ruleName + '.js';
                if (files.indexOf(expectedFilename) < 0) {
                    throw new Error('Missing ' + options.type + ' "' + basePath + expectedFilename + '" for rule "' + ruleName + '"');
                }
            })
        }
    };
})();
