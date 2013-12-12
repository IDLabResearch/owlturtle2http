/**
 * OWL/TTL 2 HTML is a script that translates a turtle file towards basic HTML
 *
 * @author Pieter Colpaert <pieter.colpaert@ugent.be>
 */

var jade = require('jade');

function owlttl2html (file) {
  return jade.renderFile('owttl2html.jd');
}

module.exports = owlttl2html;