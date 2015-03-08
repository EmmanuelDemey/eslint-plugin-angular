module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    var angularObjectList = ['controller', 'filter', 'directive'];
    var message = 'REST API calls should be implemented in a specific service';
    return {

        'CallExpression': function(node) {

            var badServices = context.options[0];
            var callee = node.callee;

            if (utils.isAngularComponent(node) && callee.type === 'MemberExpression' && angularObjectList.indexOf(callee.property.name) >= 0) {
               if(utils.isFunctionType(node.arguments[1])){
                   node.arguments[1].params.forEach(function(service){
                    if(service.type === 'Identifier' && badServices.indexOf(service.name) >= 0){
                      context.report(node, message, {});
                    }
                  });
               }

              if(utils.isArrayType(node.arguments[1])){
                node.arguments[1].elements.forEach(function(service){
                  if(service.type === 'Literal' && badServices.indexOf(service.value) >= 0){
                    context.report(node, message, {});
                  }
                });
              }
            }
        }
    };

};
