## Rules

<% _.each(rules, function (rule) { %>
 * [<%= rule.ruleName %>](<%= rule.documentationPath %>) - <%= rule.linkDescription %><%= formatStyleguideReferenceListShort(rule) %><% }) %>
----
