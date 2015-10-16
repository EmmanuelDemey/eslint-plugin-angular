# module-name - require and specify a prefix for all module names

When you create a new module, its name should start with the parameter you can define in your config object.
The second parameter can be a Regexp wrapped in quotes.
You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("module-name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angular-styleguide#style-y127)
