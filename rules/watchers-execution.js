/**
 * require and specify consistent use `$scope.digest()` or `$scope.apply()`
 *
 * For the execution of the watchers, the $digest method will start from the scope in which we call the method.
 * This will cause an performance improvement comparing to the $apply method, who start from the $rootScope
 *
 * @version 0.4.0
 * @category conventions
 */
'use strict';

module.exports = function(context) {
    var methods = ['$apply', '$digest'];
    return {

        MemberExpression: function(node) {
            var method = context.options[0];
            var forbiddenMethod = methods.filter(function(m) {
                return m !== method;
            });
            if (forbiddenMethod.length > 0 && node.property.type === 'Identifier' && forbiddenMethod.indexOf(node.property.name) >= 0) {
                context.report(node, 'Instead of using the {{forbidden}}() method, you should prefer {{method}}()', {
                    forbidden: node.property.name,
                    method: method
                });
            }
        }
    };
};

module.exports.schema = [{
    type: 'string'
}];
