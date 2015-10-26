# <%= ruleName %> - <%= lead %>

<%= description %>

<% if(allExamples.length > 0) { %>
## Examples

<% _.each(examplesGroupedByConfiguration, function (examples, config) { %>

<% if(config) { %>
Examples with the configuration <%= formatConfigAsMarkdown(examples) %>
<% } else { %>
Examples with default configuration
<% } %>
    /*eslint angular/<%= ruleName %>: <%= formatConfigAsJson(examples) %>*/
    <% _.each(examples, function (example) { %>
    // <%= example.valid ? 'valid' : 'invalid' %> <%= example.filename ? 'with filename: ' + example.filename : '' %>
    <%= indent(example.code, 4) %> <%= example.errorMessage ? '// error: ' + example.errorMessage : '' %>
    <% }) %>
<% }) %>
<% } %>

