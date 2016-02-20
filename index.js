'use strict';

var fs = require('fs');
var path = require('path');

var rules = {};
var ruleDir = path.join(__dirname, 'rules');

fs.readdirSync(ruleDir).forEach(function(name) {
    var match = name.match(/(.+)\.js$/);
    if (match) {
        rules[match[1]] = require(path.join(ruleDir, name));  // eslint-disable-line global-require
    }
});

module.exports = {
    rules: rules
};
