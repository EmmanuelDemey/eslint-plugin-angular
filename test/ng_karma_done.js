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
            it("with catch should reject if passed state does not exist", function (done) { \
              Service.save().catch(function () {                                            \
                done();                                                                     \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '\
              it("with catch passes if done function is not named done", function (foo) { \
                Service.save().catch(function () {                                        \
                  foo();                                                                  \
                });                                                                       \
              });                                                                         \
            '
    },
    {
      code: '\
              it("with then, passes if done function is not named done", function (foo) { \
                Service.save().then(function () {                                         \
                  foo();                                                                  \
                });                                                                       \
              });                                                                         \
            '
    }

  ],

  invalid: [
    {
      code: '\
          it("should fail because there is a catch with no done", function() {      \
            Service.save().catch(function () {                                      \
              doSomething();                                                        \
            });                                                                     \
          });                                                                       \
        ',
      errors: [{message: 'Spec contains a then/catch but doesn\'t define a done() function'}]
    },
    {
      code: '\
          it("should fail because there is a then with no done", function() {       \
            Service.save("paperwork").then(function () {                            \
              doSomething();                                                        \
            });                                                                     \
          });                                                                       \
        ',
      errors: [{message: 'Spec contains a then/catch but doesn\'t define a done() function'}]
    //},
    //{
    //  code: '\
    //      it("should fail because done is called outside the then", function(done) {       \
    //        Service.save("paperwork").then(function () {                            \
    //        });                                                                     \
    //        done();                                                        \
    //      });                                                                       \
    //    ',
    //  errors: [{message: 'Spec contains a then/catch that doesn\'t call the done callback'}]


    }
  ]
});
