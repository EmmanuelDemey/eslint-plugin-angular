# di-order - require DI parameters to be sorted alphabetically

Injected dependencies should be sorted alphabetically.
If the second parameter is set to false, values which start and end with an underscore those underscores are stripped.
This means for example that `_$httpBackend_` goes before `_$http_`.
