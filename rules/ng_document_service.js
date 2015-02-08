module.exports = function(context) {

    'use strict';

    function report(node){
        context.report(node, 'You should use the $document service instead of the default document object', {});
    }

    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'document'){
                report(node);
            }
        }
    };

};
