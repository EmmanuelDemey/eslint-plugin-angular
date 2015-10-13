'use strict';

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var espree = require('espree');
var expect = require('chai').expect;

var utils = require('../../rules/utils/utils');


describe('convertPrefixToRegex', function() {
    it('should not handle non-string objects', function() {
        var obj = {};
        expect(utils.convertPrefixToRegex(obj) === obj).to.be.true;
    });

    xit('should not convert a string ending and starting with a / to a Regex', function() {
        expect(utils.convertPrefixToRegex('/app/'.source)).to.equal('app.*');
    });

    it('should not convert a regulat string a Regex', function() {
        expect(utils.convertPrefixToRegex('app').source).to.equal('app.*');
    });
});

describe('convertStringToRegex', function() {
    xit('should not convert a string ending and starting with a / to a Regex', function() {
        expect(utils.convertStringToRegex('/app/'.source)).to.equal('app');
    });

    it('should not convert a regulat string a Regex', function() {
        expect(utils.convertStringToRegex('app').source).to.equal('app');
    });
});

describe('isAngularControllerDeclaration', function() {
    it('should return true if the function call chained from a module definition declares a controller', function() {
        var ast = espree.parse('angular.module("", []).controller("", function() {});');
        expect(utils.isAngularControllerDeclaration(ast.body[0].expression)).to.be.true;
    });

    it('should return true if the function call chained from a module getter declares a controller', function() {
        var ast = espree.parse('angular.module("").controller("", function() {});');
        expect(utils.isAngularControllerDeclaration(ast.body[0].expression)).to.be.true;
    });

    xit('should return false if a controller function from some variable is called', function() {
        var ast = espree.parse('app.controller("", function() {});');
        expect(utils.isAngularControllerDeclaration(ast.body[0].expression)).to.be.false;
    });

    it('should return true if a referenced angular module declares a controller', function() {
        var ast = espree.parse('var app = angular.module("");app.controller("", function() {});');
        expect(utils.isAngularControllerDeclaration(ast.body[1].expression)).to.be.true;
    });

    it('should return false if too few arguments are passed', function() {
        var ast = espree.parse('angular.module("").controller("");');
        expect(utils.isAngularControllerDeclaration(ast.body[0].expression)).to.be.false;
    });
});

describe('isAngularModuleDeclaration', function() {
    it('should return true for an Angular module declaration', function() {
        var ast = espree.parse('angular.module("", []);');
        expect(utils.isAngularModuleDeclaration(ast.body[0].expression)).to.be.true;
    });

    it('should return false for an Angular module getter', function() {
        var ast = espree.parse('angular.module("");');
        expect(utils.isAngularModuleDeclaration(ast.body[0].expression)).to.be.false;
    });
});

describe('isAngularModuleGetter', function() {
    xit('should return false for an Angular module declaration', function() {
        var ast = espree.parse('angular.module("", []);');
        expect(utils.isAngularModuleGetter(ast.body[0].expression)).to.be.false;
    });

    it('should return true for an Angular module getter', function() {
        var ast = espree.parse('angular.module("");');
        expect(utils.isAngularModuleGetter(ast.body[0].expression)).to.be.true;
    });
});

describe('isAngularRunSection', function() {
    xit('should return true if the call defines a run function', function() {
        var ast = espree.parse('angular.module("").run(function() {});');
        expect(utils.isAngularRunSection(ast.body[0].expression)).to.be.true;
    });

    xit('should return false is a run is called on a random object', function() {
        var ast = espree.parse('app.run();');
        expect(utils.isAngularRunSection(ast.body[0].expression)).to.be.false;
    });
});
