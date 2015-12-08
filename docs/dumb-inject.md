<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/dumb-inject.js', 'examples/dumb-inject.js'). -->

# dumb-inject - unittest `inject` functions should only consist of assignments from injected values to describe block variables

`inject` functions in unittests should only contain a sorted mapping of injected values to values in the `describe` block with matching names.
This way the dependency injection setup is separated from the other setup logic, improving readability of the test.

## Examples

The following patterns are considered problems;

    /*eslint angular/dumb-inject: 2*/

    // invalid
    describe(function() {
        var $httpBackend;
        var $rootScope;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            $httpBackend.whenGET('/data').respond([]);
        }));
    }); // error: inject functions may only consist of assignments in the form myService = _myService_

    // invalid
    describe(function() {
        var $httpBackend;
        var $rootScope;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        }));
    }); // error: '$httpBackend' must be sorted before '$rootScope'

The following patterns are **not** considered problems;

    /*eslint angular/dumb-inject: 2*/

    // valid
    describe(function() {
        var $httpBackend;
        var $rootScope;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        }));

        beforeEach(function() {
            $httpBackend.whenGET('/data').respond([]);
        });
    });

## Version

This rule was introduced in eslint-plugin-angular 0.15.0

## Links

* [Rule source](../rules/dumb-inject.js)
* [Example source](../examples/dumb-inject.js)
