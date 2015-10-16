# on-watch - require `$on` and `$watch` deregistration callbacks to be saved in a variable

Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler
