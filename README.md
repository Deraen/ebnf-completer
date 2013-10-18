# EBNF Completer

WIP. This should eventually become autocompleter widget which
completer Lucene Query Language (or subset of it).

e.g. user has written `name:Juho*` so now autocompleter would show that next
user should write/select `AND` or `OR` and then add another field-term -pair.

Currently there is [ebnf](./lang.json) for subset of Lucene Query Language
which [Jison](http://zaach.github.io/jison/) uses. AST-tree is
then preprocessed...

## Test
```
npm install
node index.js "field1:term1 OR field2:term2 OR field3:term3"
node index.js --process "field1:term1 OR field2:term2 OR field3:term3"
grunt
```

