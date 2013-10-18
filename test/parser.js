var chai = require('chai');
chai.should();

var index = require('..');
var parse = index.parse;

describe('parser', function() {
  it('field:term', function() {
    parse('field:term').should.deep.equal({search: ['field', 'term']});
  });

  it('whitespaces', function() {
    parse('        field      :       term').should.deep.equal({search: ['field', 'term']});
  });

  it('(e)', function() {
    parse('(field:term)').should.deep.equal({search: ['field', 'term']});
  });

  it('e OR e', function() {
    parse('field1:term1 OR field2:term2').should.deep.equal({
      or: [
        {search: ['field1', 'term1']},
        {search: ['field2', 'term2']},
      ]
    });
  });

  it('e AND e', function() {
    parse('field1:term1 AND field2:term2').should.deep.equal({
      and: [
        {search: ['field1', 'term1']},
        {search: ['field2', 'term2']},
      ]
    });
  });

  it('e OR e OR e', function() {
    parse('e:1 OR e:1 OR e:1').should.deep.equal({
      or: [
        {or: [
          {search: ['e', '1']},
          {search: ['e', '1']},
        ]},
        {search: ['e', '1']},
      ]
    });
  });
});
