# OWL/Turtle to HTTP

It's really what the name says: you can make an HTTP interface for the URIs of an ontology.

## installing

Be sure to have nodejs installed.
If you install nodejs from package manager consider https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

```bash
cd owlturtle2http/
npm install
./server
```

After this, the server will be running on port 8080. You can change this in the file `server`

## Usage

configure the `server` file with a link to your ttl file

Content negotiation: `application/json`, `text/turtle` and `text/html`

## Demo

see for example: http://semweb.mmlab.be/ns/apps4X

Or on your own install: http://localhost:8080/ns/apps4X/

# On an apache server

```bash
a2enmod proxy_http
a2enmod proxy
# Insert These 2 lines in your sites_available/000-default 
#> ProxyRequests On
#> ProxyPassReverse /      http://localhost:8080/
# Restart your apache
sudo service apache restart

```

Add this .htaccess in the right directory:
```htaccess
 Options +FollowSymLinks -Indexes -MultiViews
    
 <IfModule mod_rewrite.c>
        
 	RewriteEngine on
        
        # Simple URL redirect:
        RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*) http://localhost:8080/ns/$1 [P]

</IfModule>
```
