module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    var angularObjectList = ['controller', 'filter', 'directive', 'service', 'factory', 'provider'];
    var services = ['$http', '$resource', 'Restangular']
    var message = 'You should use the same service ({{method}}) for REST API calls';


    return {

        'CallExpression': function(node) {

            function checkAllElements(elements){
                elements.forEach(checkElement);
            }

            function checkElement(element){
                if(element.type === 'Identifier' && services.indexOf(element.name) >= 0 && context.options[0] !== element.name){
                    context.report(node, message, {
                        method: context.options[0]
                    });
                } else if(element.type === 'Literal' && services.indexOf(element.value) >= 0 && context.options[0] !== element.value){
                    context.report(node, message, {
                        method: context.options[0]
                    });
                }
            }

            var callee = node.callee;

            if (utils.isAngularComponent(node) && callee.type === 'MemberExpression' && angularObjectList.indexOf(callee.property.name) >= 0) {
                if(utils.isFunctionType(node.arguments[1])){
                    console.log(node.arguments[1].params)
                    checkAllElements(node.arguments[1].params);
                }

                if(utils.isArrayType(node.arguments[1])){
                    checkAllElements(node.arguments[1].elements);

                }
            }
        }
    };

};
