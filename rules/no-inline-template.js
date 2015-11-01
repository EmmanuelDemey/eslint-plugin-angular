/**
 * disallow the use of inline templates
 *
 * Instead of using inline HTML templates, it is better to load the HTML from an external file.
 * Simple HTML templates are accepted by default.
 * ('no-inline-template': [0, {allowSimple: true}])
 *
 * @version 0.12.0
 */
'use strict';

module.exports = function(context) {
    // Extracts any HTML tags.
    var regularTagPattern = /<(.+?)>/g;
    // Extracts self closing HTML tags.
    var selfClosingTagPattern = /<(.+?)\/>/g;

    var allowSimple = (context.options[0] && context.options[0].allowSimple) !== false;

    function reportComplex(node) {
        context.report(node, 'Inline template is too complex. Use an external template instead');
    }

    return {
        Property: function(node) {
            if (node.key.name !== 'template' || node.value.type !== 'Literal') {
                return;
            }
            if (!allowSimple) {
                context.report(node, 'Inline templates are not allowed. Use an external template instead');
            }
            if ((node.value.value.match(regularTagPattern) || []).length > 2) {
                return reportComplex(node);
            }
            if ((node.value.value.match(selfClosingTagPattern) || []).length > 1) {
                return reportComplex(node);
            }
            if (node.value.raw.indexOf('\\') !== -1) {
                reportComplex(node);
            }
        }
    };
};

module.exports.schema = [{
    allowSimple: {
        type: 'boolean'
    }
}];
