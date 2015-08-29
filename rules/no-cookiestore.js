/**
 * @ruleName no-cookiestore
 * @description
 *
 * In Angular 1.4, the $cookieStore service is now deprected.
 * Please use the $cookies service instead
 */
module.exports = function(context) {

    'use strict';

    return {

        'MemberExpression': function(node) {
            if(node.object && node.object.name === '$cookieStore'){
                context.report(node, 'Since Angular 1.4, the $cookieStore service is depreacted. Please use now the $cookies service.', {});
            }

        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
