# typecheck-regexp - use `angular.isRegexp` instead of other comparisons

You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]").
