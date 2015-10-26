# no-private-call - disallow use of internal angular properties prefixed with $$

All scope's properties/methods starting with $$ are used internally by AngularJS.
You should not use them directly.
Exception can be allowed with this option: {allow:['$$watchers']}

<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('rules/no-private-call.js', 'examples/no-private-call.js'). -->
