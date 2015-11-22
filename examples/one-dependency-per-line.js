// example - valid: true
app.controller('MyController', MyController);

function MyController($http,
                      $q) {
}

// example - valid: true
app.controller('MyController', function($http,
                                        $q) {
    });


// example - valid: true

app.controller('MyController', [
    '$http',
    '$q',
    function($http,
             $q) {
    }]);

// example - valid: true
app.controller('MyController', [
    '$http',
    '$q',
    MyController]);

function MyController($http,
                      $q) {
}

// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"
app.controller('MyController', MyController);

function MyController($http, $q) {}

// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"
app.controller('MyController', function($http, $q) {});

// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"

app.controller('MyController', ['$http','$q',
    function($http,
             $q) {
    }]);

// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"

app.controller('MyController', [
    '$http',
    '$q',
    function($http, $q) {}]);

// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"

app.controller('MyController', ['$http', '$q', MyController]);

function MyController($http,
                      $q) {}


// example - valid: false, errorMessage: "Do not use multiple dependencies in one line"

app.controller('MyController', [
    '$http',
    '$q',
    MyController]);

function MyController($http, $q) {}

// example - valid: false, errorMessages: ["Do not use multiple dependencies in one line", "Do not use multiple dependencies in one line"]

app.controller('MyController', ['$http', '$q', function($http, $q) {}]);

