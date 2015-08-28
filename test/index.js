(function(){
	var eslintAngularIndex = require('../index.js'),
        fs = require("fs");

    function detectMissingFilesForRules(type, options) {
        var basePath = options.basePath;
        var files = fs.readdirSync(basePath).filter(function (filename) {
            return options.ignoreFiles.indexOf(filename) < 0;
        });

        ruleNames.forEach(function (ruleName) {
            var expectedFilename = ruleName + '.js';
            if (files.indexOf(expectedFilename) < 0) {
                throw new Error('Missing ' + options.type + ' "' + basePath + expectedFilename + '" for rule "' + ruleName + '"');
            }
        })
    }

    var ruleNames = Object.keys(eslintAngularIndex.rules);

    detectMissingFilesForRules(ruleNames, {
        type: 'file',
        basePath: './rules/',
        ignoreFiles: ['index.js', 'utils']
    });

    detectMissingFilesForRules(ruleNames, {
        type: 'test',
        basePath: './test/',
        ignoreFiles: ['index.js']
    });

})();
