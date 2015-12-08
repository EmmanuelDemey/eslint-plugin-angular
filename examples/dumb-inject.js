// example - valid: true
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

// example - valid: false, errorMessage: "inject functions may only consist of assignments in the form myService = _myService_"
describe(function() {
    var $httpBackend;
    var $rootScope;

    beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;

        $httpBackend.whenGET('/data').respond([]);
    }));
});

// example - valid: false, errorMessage: "'$httpBackend' must be sorted before '$rootScope'"
describe(function() {
    var $httpBackend;
    var $rootScope;

    beforeEach(inject(function(_$httpBackend_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));
});
