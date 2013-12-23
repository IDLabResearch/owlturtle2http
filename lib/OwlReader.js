/**
 * OwlReader is an interface on top of the OWL ontology
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

var Triples = require("./Triples.js");

function OwlReader (triples) {
  this.triples = new Triples(triples);

  this.ontology = {};
  //TODO: check if array elements exist.
  this.ontology.uri = this.triples.getTriples( { object : 'http://www.w3.org/2002/07/owl#Ontology' } ).all[0].subject;
  this.ontology.issued = this.triples.getLiterals(this.ontology.uri, "http://purl.org/dc/elements/1.1/issued")[0];
  this.ontology.modified = this.triples.getLiterals(this.ontology.uri, "http://purl.org/dc/elements/1.1/modified")[0];
}

OwlReader.prototype.getTitle = function () {
  return this.triples.getLiterals( this.ontology.uri,"http://purl.org/dc/elements/1.1/title")[0];
}


OwlReader.prototype.getDescription = function () {
  return this.triples.getLiterals( this.ontology.uri,"http://purl.org/dc/elements/1.1/description")[0];
}

OwlReader.prototype.getClasses = function () {
  return this.triples.getUrisOfType("http://www.w3.org/2002/07/owl#Class");
}

OwlReader.prototype.getObjectProperties = function () {
    return this.triples.getUrisOfType("http://www.w3.org/2002/07/owl#ObjectProperty");
}

module.exports = OwlReader;
