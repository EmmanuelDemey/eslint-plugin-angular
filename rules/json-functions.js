/**
 * enforce use of`angular.fromJson` and 'angular.toJson'
 *
 * You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify
 *
 * @linkDescription use `angular.fromJson` and 'angular.toJson' instead of `JSON.parse` and `JSON.stringify`
 * @version 0.1.0
 * @category angularWrapper
 */
'use strict';

module.exports = function(context) {
    return {

        MemberExpression: function(node) {
            if (node.object.name === 'JSON') {
                if (node.property.name === 'stringify') {
                    context.report(node, 'You should use the angular.toJson method instead of JSON.stringify', {});
                } else if (node.property.name === 'parse') {
                    context.report(node, 'You should use the angular.fromJson method instead of JSON.parse', {});
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
