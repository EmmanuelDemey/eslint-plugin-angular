//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
  ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_karma_done', {
  valid: [
    {
      code: '\
          \
            it("with catch should reject if passed state does not exist", function (done) { \
              Service.save().catch(function () {                                            \
                done();                                                                     \
              });                                                                           \
              $scope.$digest();                                                             \
            });                                                                             \
          '
    },
    {
      code: '\
            \
              it("with catch passes if done function is not named done", function (foo) { \
                Service.save().catch(function () {                                        \
                    foo();                                                                \
                });                                                                       \
                $scope.$digest();                                                         \
              });                                                                         \
            '
    },
    {
      code: '\
            \
              it("with then, passes if done function is not named done", function (foo) { \
                Service.save().then(function () {                                         \
                    foo();                                                                \
                });                                                                       \
                $scope.$digest();                                                         \
              });                                                                         \
            '
    }

  ],

  invalid: [
    {
      code: '\
        \
          it("should fail because there is a catch with no done", function() {      \
            Service.save().catch(function () {                                      \
              expect(1).toEqual(1);                                                 \
            });                                                                     \
            $scope.$digest();                                                       \
          });                                                                       \
        \
        ',
      errors: [{message: 'Spec contains a then/catch but doesn\'t define a done() function'}]
    },
    {
      code: '\
        \
          it("should fail because there is a then with no done", function() {       \
            Service.save("paperwork").then(function () {                            \
              expect(1).toEqual(1);                                                 \
            });                                                                     \
            $scope.$digest();                                                       \
          });                                                                       \
        \
        ',
      errors: [{message: 'Spec contains a then/catch but doesn\'t define a done() function'}]
    }
  ]
});
