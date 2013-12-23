/**
 * Triples is an easy interface to work with triples in nodejs
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

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
  var result = [];
  var uris =  this.getTriples( { predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" , object : type } ).all;
  for( var i = 0 ; i < uris.length; i ++) {
    result.push(uris[i].subject);
  }
  return result;
}

function Literal (o) {
  this.language = "";
  this.datatype = "";
  this.value = o; //todo: regex

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
