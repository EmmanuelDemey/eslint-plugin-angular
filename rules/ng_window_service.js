module.exports = function(context) {

    'use strict';

    function report(node){
        context.report(node, 'You should use the $window service instead of the default window object', {});
    }

    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'window'){
                report(node);
            }
        }
    };

};
