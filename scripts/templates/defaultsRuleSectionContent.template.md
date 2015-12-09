## Defaults

```json
{
    "plugins": [
        "angular/angular"
    ],
    "rules": {<% _.each(rules, function (rule, index, rules) { %>
        "angular/<%= rule.ruleName %>": <%= rule.defaults %><%
        if (index !== rules.length -1) {%>,<% }
        }) %>
    }
}
```

----
