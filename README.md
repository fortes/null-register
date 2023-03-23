# No longer maintained

This is no longer maintained, code is archived and available for forking though.

# Why?

Say you're using [style-loader](https://github.com/webpack/style-loader) in order to do something neat like:

```
var css = require('./my.css');
``` 

This works just fine when you're building with webpack to run in the browser. But if you want to run outside of the browser environment (say in order to test with JSDom), then things break. This module fixes that.

## Use via `package.json`

```
{
  "name": "package-name",
  "null-register": [".css", ".less"]
}
```

Then just `require('null-register')` somewhere in your code. This is useful for mocha, for example:

```
mocha --compilers css:null-register
```

## Environment variables

Null register can read extensions from the `$NODE_NULL_REGISTER` environment variable. For example, to use `null-register` with Mocha to stub out CSS and LESS requires:

```
NODE_NULL_REGISTER=".css .less" mocha --compilers css:null-register
```

## Programmatic Usage

Simply make the following call *before* calling `require` for the given extensions:

```
require('null-register')(['.css', '.less']);
```

# Changelog

* **0.1.0**: Add support for loading via `package.json`
* **0.0.1**: First version
