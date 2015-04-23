/**
 * Triples is an easy interface to work with triples in nodejs
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

var N3Util = require('n3').Util,
    util = require('util');

function Triples (triples) {
  triples = triples?triples:[];
  this.all = [];
  for ( var i = 0 ; i < triples.length ; i ++) {
    this.all.push(new Triple(triples[i].subject,triples[i].predicate, triples[i].object));
  }
}

Triples.prototype.push = function (triple) {
  this.all.push( new Triple(triple.subject,triple.predicate, triple.object) );
}


Triples.prototype.getTriples = function ( triplePattern ) {
  var result = new Triples();
  for ( var i = 0 ; i < this.all.length ; i ++) {
    var triple = this.all[i];
    if( (!triplePattern.subject || triple.subject === triplePattern.subject ) &&
        (!triplePattern.predicate || triple.predicate === triplePattern.predicate ) &&
        (!triplePattern.object || triple.object === triplePattern.object ) ) {
      result.push(triple);
    }
  }
  return result;
}

Triples.prototype.getLiterals = function ( subject, predicate ) {
  var result = [];
  for ( var i = 0 ; i < this.all.length ; i ++) {
    var triple = this.all[i];
    if( (triple.subject === subject ) &&
        (triple.predicate === predicate ) ) {
      result.push(new Literal(triple.object));
    }
  }
  return result;
}

Triples.prototype.getUrisOfType = function (type) {
  if (!util.isArray(type)) {
    type = [type];
  }
  var results = [];
  for (var i = 0; i < type.length; i++) {
    var uris = this.getTriples( { predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" , object : type } ).all;
    for (var j=0; j < uris.length; j++) {
      if (results.indexOf(uris[j].subject) > -1) {
        results.push(uris[j].subject);
      }
    }
  }
  return results;
}

Triples.prototype.getOneOfTheseLiterals = function (subject, predicates) {
  var i = 0;
  while (i < predicates.length && this.getLiterals(subject,predicates[i]).length === 0) {
    i++;
  }
  if( i === predicates.length ) {
    return undefined;
  }else{
    return this.getLiterals(subject, predicates[i])[0];
  }
}

Triples.prototype.getAllOfTheseLiterals = function (subject, predicates) {
  var literals = [];
  for ( var i = 0; i < predicates.length; i++) {
    literals = literals.concat(this.getLiterals(subject, predicates[i]));
  }
  return literals;
}

Triples.prototype.getAllOfTheseObjects = function (subject, predicates ) {
  var objects = [];
  for ( var i = 0; i < predicates.length; i++) {
    var tr = this.getTriples( { subject : subject, predicate : predicates[i] }).all;
    var result = [];
    for (var j = 0; j < tr.length ; j++) {
      result.push(tr[j].object);
    }
    objects = objects.concat(result);
  }
  return objects;
}


function Literal (o) {
  this.language = N3Util.getLiteralLanguage(o);
  this.datatype = N3Util.getLiteralType(o);
  this.value = N3Util.getLiteralValue(o);

  this.toString = function () {
    return this.value;
  }
}

function Triple (s,p,o) {

  this.subject = s;
  this.predicate = p;
  this.object = o;

  this.getLiteral = function () {
    return new Literal(this.object);
  }

}

module.exports = Triples;
