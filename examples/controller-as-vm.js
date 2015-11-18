// example - valid: true
angular.module('test').controller('TestController', function() {
    var vm = this;
    vm.test = 'test';
});

// example - valid: false, errorMessage: "You should not use \"this\" directly. Instead, assign it to a variable called \"vm\""
angular.module('test').controller('TestController', function() {
    this.test = 'test';
});


// example - valid: true, options: ["viewModel"]
angular.module('test').controller('TestController', function() {
    var viewModel = this;
    viewModel.test = 'test';
});

// example - valid: false, options: ["viewModel"], errorMessage: "You should assign \"this\" to a consistent variable across your project\: viewModel"
angular.module('test').controller('TestController', function() {
    var vm = this;
    vm.test = 'test';
});
