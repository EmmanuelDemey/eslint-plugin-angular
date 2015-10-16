# no-private-call - disallow use of internal angular properties prefixed with $$

All scope's properties/methods starting with $$ are used internally by AngularJS.
You should not use them directly.
Exception can be allowed with this option: {allow:['$$watchers']}
