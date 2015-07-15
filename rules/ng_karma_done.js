module.exports = function (context) {

  'use strict';

  function isIt(node) {
    return node.callee && node.callee.name === 'it';
  }

  function getDoneFnName(node) {
    if (node.arguments.length === 2) { // 'it' should always have 2 args, 2nd one being the function for the test
      // TODO: unless people are getting too fancy on me
      var fe = node.arguments[1];
      if (fe.type === 'FunctionExpression') {
        if (fe.params && fe.params[0]) {
          return fe.params[0].name;
        }
      }
    }
  }


  // if there is a .then or a .catch, it should call a DONE function
  function checkDoneIsDefined(node) {
    var source = context.getSource(node);
    if (source.indexOf('.then') > -1 || source.indexOf('.catch') > -1) {
      var doneFnName = getDoneFnName(node);
      if (!doneFnName) {
        context.report(node, 'Spec contains a then/catch but doesn\'t define a done() function');
        return true;
      }
    }
    return false;
  }

  function getThen(node) {
    var calledDone = false;
    if (node.arguments.length === 2) { // 'it' should always have 2 args, 2nd one being the function for the test
      // TODO: unless people are getting too fancy on me
      var fe = node.arguments[1];
      var doneFnName = getDoneFnName(node);
      if (fe.type === 'FunctionExpression') {

        // then or catch
        for ( var i = 0; i < fe.body.body.length; i++ ) {
          var thenOrCatch = fe.body.body[i].expression.callee.property.name;
          if (thenOrCatch === 'then' || thenOrCatch === 'catch') {
            console.log('bbbb', fe.body.body[0].expression);
            console.log('rrrr', fe.body.body[1].expression);
            var bodyParts = fe.body.body[i].expression.arguments[0].body.body;
            console.log('cccc', bodyParts);
            for ( var j = 0; j < bodyParts.length; j++) {
              if (bodyParts[j].expression.callee.type === 'Identifier' &&
                bodyParts[j].expression.callee.name === doneFnName) {
                calledDone = true;
              } else {
                console.log('aaaa', bodyParts[j].expression);
              }
            }
          }
        }
      }
    }
    if (!calledDone) {
      context.report(node, 'Done not called');
    }
  }


  // if it has a DONE function passed in, it should call it within a catch or then block
  function checkDoneIsCalledProperly(node) {
    var doneFnName = getDoneFnName(node);

    if (doneFnName) {
      var source = context.getSource(node);

      // GOOD: see if function name is anywhere in the code beyond the param
      // FIXME this fails if doneFnName is in the spec name
      if (source.indexOf(doneFnName, source.indexOf(doneFnName) + 1) === -1) {
        context.report(node, doneFnName + '() not called - this will hang karma');
      }

      // BETTER: make sure DONE function is used within a then/catch
      if (true) {
        getThen(node);
        //context.report(node, "done() called, but not within then/catch");
      }

    }
  }


  return {

    'CallExpression': function (node) {
      var runningTests = context.getFilename() === '<input>';

      if (runningTests || context.getFilename().indexOf('-spec.js') > 0) {

        if (isIt(node)) {

          var error = checkDoneIsDefined(node);

          //if (!error) {
          //  checkDoneIsCalledProperly(node);
          //}

          //TODO: needs a $digest, $apply or flush

        }
      }
    }
  };
};
