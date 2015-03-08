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
