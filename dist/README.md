# Running Browserify
To build with Browserify, run this terminal command in the project root folder:

```
browserify lib/index.js -o dist/feathers-websocket-client.js -s Feathers.client
```

(You'll need to have [Browserify installed globally](http://browserify.org/#install), first)