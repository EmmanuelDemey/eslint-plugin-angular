module.exports = function(context) {

    'use strict';

    function report(node, method){

        context.report(node, 'The "{{method}}" call should be assigned to a variable, in order to be destroyed during the $destroy event', {
            method: method
        });
    }

    return {

        'CallExpression': function(node) {
            if(node.callee.type === 'MemberExpression' &&
                 (node.callee.object.name === '$scope' || node.callee.object.name === '$rootScope' || node.callee.object.name === 'scope')){

                if(node.callee.property.name === 'on' || node.callee.property.name === 'watch'){

                    if(node.parent.type !== 'VariableDeclarator' && node.parent.type !== 'AssignmentExpression'){
                        report(node, node.callee.property.name);
                    }
                }
           }
        }
    };

};
