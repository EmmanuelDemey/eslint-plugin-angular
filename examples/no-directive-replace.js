// example - valid: true
angular.module('myModule').directive('helloWorld', function() {
    return {
        template: '<h2>Hello World!</h2>'
    };
});

// example - valid: true,  options: [{"ignoreReplaceFalse": true}]
angular.module('myModule').directive('helloWorld', function() {
    return {
        template: '<h2>Hello World!</h2>',
        replace: false
    };
});

// example - valid: false, errorMessage: "Directive definition property replace is deprecated."
angular.module('myModule').directive('helloWorld', function() {
    return {
        template: '<h2>Hello World!</h2>',
        replace: true
    };
});

// example - valid: false, errorMessage: "Directive definition property replace is deprecated."
angular.module('myModule').directive('helloWorld', function() {
    var directiveDefinition = {};
    directiveDefinition.templateUrl = 'helloWorld.html';
    directiveDefinition.replace = true;
    return directiveDefinition;
});

// example - valid: false,  options: [{"ignoreReplaceFalse": false}], errorMessage: "Directive definition property replace is deprecated."
angular.module('myModule').directive('helloWorld', function() {
    return {
        template: '<h2>Hello World!</h2>',
        replace: true
    };
});


