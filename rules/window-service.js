/**
 * @ruleName window-service
 * @description
 *
 * Instead of the default window object, you should prefer the AngularJS wrapper service $window.
 * [Y180](https://github.com/johnpapa/angular-styleguide#style-y180)
 */
module.exports = function(context) {

    'use strict';

    var restrict = ['document', 'setInterval', 'setTimeout'];
    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'window' && restrict.indexOf(node.property.name) < 0){
                context.report(node, 'You should use the $window service instead of the default window object', {});
            }
        }
    };

};

module.exports.schema = [];
