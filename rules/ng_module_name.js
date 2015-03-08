module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            if(prefix === undefined) {
                return;
            }

            if (utils.isAngularModuleDeclaration(node)) {
               var name = node.arguments[0].value;

                if(name !== undefined && name.indexOf('ng') === 0){
                    context.report(node, 'The {{module}} module should not start with "ng". This is reserved for AngularJS modules', {
                        module: name
                    });
                } else {
                    if(name !== undefined && !utils.isRegexp(prefix) && !(name.indexOf(prefix) === 0)){

                       context.report(node, 'The {{module}} module should be prefixed by {{prefix}}', {
                            module: name,
                            prefix: prefix
                        });

                    } else if(utils.isRegexp(prefix) && !prefix.test(name)){
                        context.report(node, 'The {{module}} module should follow this pattern: {{prefix}}', {
                            module: name,
                            prefix: prefix.toString()
                        });
                    }
                }
            }
        }
    };
};
