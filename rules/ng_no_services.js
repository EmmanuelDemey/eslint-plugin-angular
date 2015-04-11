module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    var angularObjectList = ['controller', 'filter', 'directive'];
    var message = 'REST API calls should be implemented in a specific service';

    function isArray(item) {
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    function isObject(item) {
        return Object.prototype.toString.call(item) === '[object Object]';
    }

    if (isArray(context.options[0])) {
        var badServices = context.options[0];
    }

    if (isArray(context.options[1])) {
        angularObjectList = context.options[1];
    }

    if (isObject(context.options[0])) {
        var map = context.options[0],
            result = [],
            prop;

        for (prop in map) {
            if (map.hasOwnProperty(prop)) {
                result.push(prop);
            }
        }

        angularObjectList = result;
    }

    function isSetBedService(serviceName, angularObjectName) {
        if (map) {
            return map[angularObjectName].indexOf(serviceName) >= 0;
        }
        else {
            return badServices.indexOf(serviceName) >= 0;
        }
    }

    return {

        'CallExpression': function(node) {

            var callee = node.callee,
                angularObjectName = callee.property.name;

            if (utils.isAngularComponent(node) && callee.type === 'MemberExpression' && angularObjectList.indexOf(angularObjectName) >= 0) {
               if(utils.isFunctionType(node.arguments[1])){
                   node.arguments[1].params.forEach(function(service){
                    if(service.type === 'Identifier' && isSetBedService(service.name, angularObjectName)){
                      context.report(node, message + ' (' + service.name + ' in ' + angularObjectName + ')', {});
                    }
                  });
               }

              if(utils.isArrayType(node.arguments[1])){
                node.arguments[1].elements.forEach(function(service){
                  if(service.type === 'Literal' && isSetBedService(service.value, angularObjectName)){
                    context.report(node, message + ' (' + service.value + ' in ' + angularObjectName + ')', {});
                  }
                });
              }
            }
        }
    };

};
