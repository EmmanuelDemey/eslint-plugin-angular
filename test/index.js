(function(){
	var eslintAngularIndex = require('../index.js'),
        testUtils = require("./utils/testUtils.js");

    var ruleNames = Object.keys(eslintAngularIndex.rules);

    var ruleFiles = testUtils.getFiles({
        basePath: './rules/',
        ignoreFiles: ['index.js', 'utils']
    });

    var testFiles = testUtils.getFiles({
        basePath: './test/',
        ignoreFiles: ['index.js', 'utils']
    });

    testUtils.detectMissingFilesForRules(ruleNames, {
        type: 'file',
        files: ruleFiles
    });

    testUtils.detectMissingFilesForRules(ruleNames, {
        type: 'test',
        files: testFiles
    });

    testUtils.detectMissingRuleDefinitionForFiles(ruleFiles, {
        ruleNames: ruleNames
    });

    testUtils.detectMissingRuleDefinitionForFiles(testFiles, {
        ruleNames: ruleNames
    });

})();
