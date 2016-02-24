'use strict';

/* eslint-disable global-require */

var fs = require('fs');
var path = require('path');

var rules = {};
var ruleDir = path.join(__dirname, 'rules');

fs.readdirSync(ruleDir).forEach(function(name) {
    var match = name.match(/(.+)\.js$/);
    if (match) {
        rules[match[1]] = require(path.join(ruleDir, name));
    }
});

module.exports = {
    rules: rules,
    environments: require('./environments')
};
