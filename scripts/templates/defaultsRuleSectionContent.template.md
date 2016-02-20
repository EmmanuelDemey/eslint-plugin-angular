## Defaults

```yaml
plugins:
  - angular
rules:<% _.each(rules, function (rule, index, rules) { %>
  - angular/<%= rule.ruleName %>: <%= rule.defaults %><% }) %>
```

----
