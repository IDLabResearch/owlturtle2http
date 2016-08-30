from rdflib import Graph, URIRef, Literal
import sys

if len(sys.argv) != 2:
  print('')

g = Graph()
g.parse(sys.argv[1], format='n3')
print(g.serialize(format='pretty-xml'))