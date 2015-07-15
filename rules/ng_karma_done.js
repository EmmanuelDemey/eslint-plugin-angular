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
      if (!getDoneFnName(node)) {
        context.report(node, 'Spec contains a then/catch but doesn\'t define a done() function');
        return true;
      }
    }
    return false;
  }


  var withinCatchOrThen = false;
  var foundDoneFn = false;
  var calledDoneFn = false;
  var doneFnName;

  function reset() {
    withinCatchOrThen = false;
    foundDoneFn = false;
    calledDoneFn = false;
    doneFnName = undefined;
  }

  return {

    'Identifier': function (node) {
      if (node.name === 'catch' || node.name === 'then') {
        withinCatchOrThen = true;

      } else {

        if (withinCatchOrThen) {
          if (node.name === doneFnName) {
            calledDoneFn = true;
          }
        }
      }
    },

    'CallExpression': function (node) {
      var runningTests = context.getFilename() === '<input>';

      if (runningTests || context.getFilename().indexOf('-spec.js') > 0) {

        if (isIt(node)) {
          reset();
          doneFnName = getDoneFnName(node);

          checkDoneIsDefined(node);
          //TODO: needs a $digest, $apply or flush

        }
      }
    }
  };
};
