```
$ npm install
$ ./node_modules/.bin/rescript
$ ./node_modules/.bin/esbuild src/index.bs.js --bundle --outfile=src/index.prod.js
$ caddy file-server --root src
# load localhost:80 in browser
```
