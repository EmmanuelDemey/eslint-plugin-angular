// example - valid: true
$cookies.put('favoriteMeal', 'pizza');

// example - valid: true
$cookies.get('favoriteMeal');

// example - valid: false, errorMessage: "Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service."
$cookieStore.put('favoriteMeal', 'pizza');

// example - valid: false, errorMessage: "Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service."
$cookieStore.get('favoriteMeal');
