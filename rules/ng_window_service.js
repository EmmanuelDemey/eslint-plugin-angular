module.exports = function(context) {

    'use strict';

    function report(node){
        context.report(node, 'You should use the $window service instead of the default window object', {});
    }

    var restrict = ['document', 'setInterval', 'setTimeout'];
    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'window' && restrict.indexOf(node.property.name) < 0){
                report(node);
            }
        }
    };

};
