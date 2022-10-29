## Goals

- [x] Basic counter app
- [x] Use CSS classes
- [x] Make network calls
- [x] URL navigation
- [ ] Use a custom component
- [ ] Implement session + page architecture found in https://github.com/elm/package.elm-lang.org/

## Usage

```
$ npm install
$ ./node_modules/.bin/rescript
$ ./node_modules/.bin/esbuild src/index.bs.js --bundle --outfile=src/index.prod.js
$ caddy file-server --root src
# load localhost:80 in browser
```
