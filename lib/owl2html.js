/**
 * OWL 2 HTML is a script that translates a turtle file towards basic HTML
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

var jade = require('jade');
var fs = require('fs');

/**
 * This function expects triples in an array as an input
 * it returns a string with an HTML file in it
 */
function owl2html (triples) {
  var jadeTemplate = fs.readFileSync('lib/owlttl2html.jd', "utf8");
  var j = jade.compile(jadeTemplate);
  return j({
    pageTitle : "RML"
  });
}

module.exports = owl2html;
