// example - valid: true, options: ["prefix"]
angular.module('prefixModule', []);

// example - valid: true, options: ["/^xyz/"]
angular.module('xyzModule', []);

// example - valid: false, options: ["xyz"], errorMessage: "The myModule module should be prefixed by xyz"
angular.module('myModule', []);

// example - valid: false, options: ["/^xyz/"], errorMessage: "The otherModule module should follow this pattern\: /^xyz/"
angular.module('otherModule', []);

