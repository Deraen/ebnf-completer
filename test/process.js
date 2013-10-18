
var chai = require('chai');
chai.should();

var index = require('..');
var parse = index.parse;
var process = index.process;

describe('parser', function() {
  it('e OR e OR e', function() {
    process({
      or: [
        {or: [
          {search: ['term1', 'field1']},
          {search: ['term2', 'field2']},
        ]},
        {search: ['term3', 'field3']},
      ]
    }).should.deep.equal({
      or: [
        {search: ['term1', 'field1']},
        {search: ['term2', 'field2']},
        {search: ['term3', 'field3']},
      ]
    });
  });

  it('e AND e AND e AND e OR e OR e', function() {
    var ast = parse('term1:field1 AND term2:field2 AND term3:field3 OR term4:field4 OR term5:field5');
    process(ast).should.deep.equal({
      or: [
        {and: [
          {search: ['term1', 'field1']},
          {search: ['term2', 'field2']},
          {search: ['term3', 'field3']},
        ]},
        {search: ['term4', 'field4']},
        {search: ['term5', 'field5']},
      ]
    });
  });
});
