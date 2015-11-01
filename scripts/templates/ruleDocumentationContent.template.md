<!-- WARNING: Generated documentation. Edit docs and examples in the rule and examples file ('<%= sourcePath %>', '<%= examplesPath %>'). -->

# <%= ruleName %> - <%= lead %>

<%= description %>

<% if(styleguideReferences.length > 0) { %>
**Styleguide Reference**
<% _.each(styleguideReferences, function(styleRef) { %>
* <%= formatStyleguideReference(styleRef) %><% }); } %>

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

## Version

This rule was introduced in eslint-plugin-angular <%= version %>

## Links

* [Rule source](../<%= sourcePath %>)
* [Example source](../<%= examplesPath %>)
