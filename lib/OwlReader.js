/**
 * OwlReader is an interface on top of the OWL and RDFS ontologies
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

var Triples = require("./Triples.js");

function OwlReader (triples) {
  this.triples = new Triples(triples);

  this.ontology = {};
  if ( this.triples.getTriples( { object : 'http://www.w3.org/2002/07/owl#Ontology' } ).all.length === 0 ) {
    throw "No ontology URI found in the ontology file";
  }
    
  this.ontology.uri = this.triples.getTriples( { object : 'http://www.w3.org/2002/07/owl#Ontology' } ).all[0].subject;
  this.ontology.issued = this.triples.getOneOfTheseLiterals(this.ontology.uri, [
    "http://purl.org/dc/elements/1.1/issued",
    "http://purl.org/dc/terms/issued"
  ]);
  this.ontology.modified = this.triples.getOneOfTheseLiterals(this.ontology.uri, [
    "http://purl.org/dc/elements/1.1/modified",
    "http://purl.org/dc/terms/modified"
  ]);
}

OwlReader.prototype.getTitle = function () {
  var title = this.triples.getOneOfTheseLiterals(this.ontology.uri, [
    "http://purl.org/dc/terms/title",
    "http://purl.org/dc/elements/1.1/title"
  ]);
  return title?title:"Unnamed ontology";
}

OwlReader.prototype.getDescription = function () {
  var description = this.triples.getOneOfTheseLiterals(this.ontology.uri, [
    "http://purl.org/dc/elements/1.1/description",
    "http://purl.org/dc/terms/description",
    "http://www.w3.org/2000/01/rdf-schema#comment"
  ]);
  return description?description:"No description found";
}

OwlReader.prototype.getCreators = function () {
  var creators = this.triples.getAllOfTheseObjects(this.ontology.uri, [
    "http://purl.org/dc/elements/1.1/creator",
    "http://purl.org/dc/terms/creator",
  ]);
  return creators;
}

module.exports = OwlReader;
