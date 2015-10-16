# controller-as - disallow assignments to `$scope` in controllers

You should not set properties on $scope in controllers.
Use controllerAs syntax and add data to 'this'.
Implements 'this' check part of [Y031](https://github.com/johnpapa/angular-styleguide#style-y031).
The second parameter can be a Regexp for identifying controller functions (when using something like Browserify)
