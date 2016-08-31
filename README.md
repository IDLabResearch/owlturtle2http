# OWL/Turtle to HTTP

It's really what the name says: you can make an HTTP interface for the URIs of an ontology.

There are two main scripts in this repo:
* `server`: 
    a Node.js server that dynamically content-negotiates your turtle file in `application/json`, `text/turtle`, and `text/html`
* `serve`: 
    a generation script that uses your turtle file to generate the files in `application/json`, `text/turtle`, `application/rdf+xml` and `text/html`,
    and accompanying `.htaccess` to support content negotiation.

The latter needs an additional web server (such as Apache) to actually serve your files.

## installing

Be sure to have nodejs installed.
If you install nodejs from package manager consider https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

```bash
cd owlturtle2http/
npm install
```

## executing

### `server`: Running a node.js server

```bash
./server
```

After this, the server will be running on port 8080. You can change this in the file `server`

### `serve`: Generating all files

```bash
./serve -h
usage: serve [-h] [-v] [-o ONTOLOGY] [-a] [-i]

Serving your turtle ontologies

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -o ONTOLOGY, --ontology ONTOLOGY
                        label of the turtle file you want to serve, as
                        specified in the config file. If provided, the
                        version can also be added (e.g., "apps4X:0.4", if so,
                        the turtle file will also be published under apps4X/0.
                        4/. The name of the turtle CANNOT be `assets` (as all
                        site assets reside in the `assets`-folder)
  -a, --all             (re-)serve all turtle files in the config file
  -i, --index           (re-)render the index.html file. Don't do this if you
                        have your own index.html file! PS: this actually
                        tries to be smart, and links to all subfolders that
                        have a .htaccess file in them, so is not necessarily
                        depending on config.files
```

## Configuration

`config.example.json` shows an exemplary configuration. The actual config file should be `config.json`.
It has three parts:

* `outpath`: 
    the file path (relative or absolute) to where to generate you static files to.
    This could be, e.g., the root of your web server, or a subfolder thereof (also virtual hosts are possible, see below).
    For basic (UNIX) configurations, this is usually `/var/www/html`.
* `namespacebase`: 
    the url path (relative) to where your namespaces will reside for `serve`
    (for `server`, this is by default `/ns`, but can be changed in the file).
    E.g., if you publish all your ontologies on `http://example.com/ns`,
    `namespacebase` should be `/ns`.
* `files`:
    a dictionary of your ontologies: their labels and the (relative or absolute) path to their turtle file.
    These labels need to be used for the `-o` input parameter for `./serve`.
    Both `serve` and `server` will use these labels as the shortname of the ontologies you want to publish,
    e.g., the ontology with shortname `apps4X` will be generated under `{outpath}/{namespacebase}/apps4X` in `serve`,
    or served under `/ns/apps4X` in `./server`. 

## Demo

see for example: http://semweb.mmlab.be/ns/apps4X

Or `./server` on your own install: http://localhost:8080/ns/apps4X/

## Configuring apache

### `server`

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

## `server`

You can set `config.outpath` to (a subfolder of) the root path of your web server and be done with it.
But, e.g., if you want your namespace to reside on a subdomain (e.g., `http://ns.example.com`),
you can use following [VirtualHost Configuration](https://httpd.apache.org/docs/2.4/vhosts/):

```
<VirtualHost *:80>
    DocumentRoot "[absolute outpath]"
    ServerName ns.localhost
    ErrorLog "logs/webgrind-error.log"
    CustomLog "logs/webgrind-access.log" common
    <Directory "[absolute outpath]">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
    </Directory>
    LogLevel warn
</VirtualHost>
```

# License

MIT
