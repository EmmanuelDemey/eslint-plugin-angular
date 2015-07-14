module.exports = function (context) {

  'use strict';

  var utils = require('./utils/utils');

  function isIt(node) {
    return node.callee && node.callee.name === 'it';
  }

  function getDoneFnName(node) {
    if (node['arguments'].length === 2) { // 'it' should always have 2 args, 2nd one being the function for the test
      // TODO: unless people are getting too fancy on me
      var fe = node['arguments'][1];
      if (fe.type == "FunctionExpression") {
        if (fe.params && fe.params[0]) {
          return fe.params[0].name;
        }
      }
    }
  }

  function getThen(node) {
    if (node['arguments'].length === 2) { // 'it' should always have 2 args, 2nd one being the function for the test
                                          // TODO: unless people are getting too fancy on me
      var fe = node['arguments'][1];
      if (fe.type == "FunctionExpression") {

        // then or catch
        for (var i=0; i< fe.body.body.length; i++) {
          var thenOrCatch = fe.body.body[i].expression.callee.property.name;
          if (thenOrCatch === 'then' || thenOrCatch === 'catch') {
            //console.log(fe.body);
            //console.log('------');
            ////console.log(fe.body.body[0]);
            //console.log('######');
            //console.log(fe.body.body[i].expression.arguments[0]);
            var bodyParts = fe.body.body[i].expression.arguments[0].body.body;
            for (var j=0; j<bodyParts.length; j++) {
              //console.log(bodyParts[j]);
              if (bodyParts[j].expression.callee.type === 'Identifier' &&
                bodyParts[j].expression.callee.name === 'done') {
                console.log("we're good, we called done!");
              }
            }
          }
        }
      }
    }
  }

  return {

    'CallExpression': function (node) {

      if (context.getFilename().indexOf('-spec.js') > 0) {

        if (isIt(node)) {

          // if there is a .then or a .catch, it should call a DONE function
          var source = context.getSource(node);
          if (source.indexOf('.then') > -1 || source.indexOf('.catch') > -1) {
            var doneFnName = getDoneFnName(node);
            if (!doneFnName) {
              context.report(node, "Spec contains a then/catch but doesn't define a done() function");
            }
          }

          //// if it has a DONE function passed in, it should call it
          //var doneFnName = getDoneFnName(node);
          //if (doneFnName) {
          //  var source = context.getSource(node);
          //
          //  // GOOD: see if function name is anywhere in the code beyond the param
          //  // FIXME this fails if doneFnName is in the spec name
          //  if (source.indexOf(doneFnName, source.indexOf(doneFnName) + 1) === -1) {
          //    context.report(node, doneFnName + "() not called - this will hang karma");
          //  }
          //
          //  // BETTER: make sure DONE function is used within a then/catch
          //  if (true) {
          //    getThen(node);
          //    //context.report(node, "done() called, but not within then/catch");
          //  }
          //
          //}

          //TODO: needs a $digest, $apply or flush

        }
      }
    }
  };
};
