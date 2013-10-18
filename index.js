var Parser = require('jison').Parser;
var _ = require('lodash');
var fs = require('fs');
var optimist = require('optimist');

var parser = new Parser(require('./lang.json'));

var arrayRef = [];
var push = arrayRef.push;
var unshift = arrayRef.unshift;
var splice = arrayRef.splice;

exports.process = function processAst(ast, parent) {
  if (_.isArray(ast)) {
    for (var i = 0; i < ast.length; ++i) {
      var a = ast[i];
      if (_.isPlainObject(a)) {
        processAst(a, 'array');
        if (a[parent]) {
          var t = a[parent];
          ast.splice(i, 1);
          unshift.apply(ast, t);
        }
      }
    }
  } else if (_.isPlainObject(ast)) {
    var op = _(ast).keys().first();
    processAst(ast[op], op);
  }
  return ast;
};

exports.parse = function(str) {
  return parser.parse(str);
};

if (require.main === module) {
  var argv = optimist.boolean('process').argv;
  if (argv._.length === 0) return;

  var ast = exports.parse(argv._[0]);
  if (argv.process) {
    exports.process(ast);
  }
  console.log(JSON.stringify(ast, null, 2));
}
