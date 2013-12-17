# OWL/Turtle to HTTP

It's really what the name says: you can make an HTTP interface for the URIs of an ontology.

## installing

Be sure to have nodejs installed.

```bash
cd owlturtle2http/
npm install
./server
```

After this, the server will be running on port 8080. You can change this in the file `server`

## Usage

configure the `server` file with a link to your ttl file

Content negotiation: `application/json`, `application/ttl` and `text/html`

## Demo

see for example: http://semweb.mmlab.be/ns/rml/

Or on your own install: http://localhost:8080/ns/rml/
