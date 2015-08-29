/**
 * @ruleName foreach
 * @description
 *
 * You should use the angular.forEach method instead of the default JavaScript implementation [].forEach.
 */
module.exports = function(context) {

    'use strict';

    return {
        'MemberExpression': function(node){
           if(node.object.type === 'Identifier' && node.object.name !== 'angular' && node.property.name === 'forEach'){
               context.report(node, 'You should use the angular.forEach method', {});
           }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
