#!/usr/bin/node
var assert = require('assert');

process.env['NODE_NULL_REGISTER'] = '.txt'
require('..')(['.css']);

try {
  require('./sample.null');
} catch (ex) {
  assert(false, 'Extension from package.json failed to load');
}

try {
  require('./sample.txt');
} catch (ex) {
  assert(false, 'Extension from environment variable failed to load');
}

try {
  require('./sample.css');
} catch (ex) {
  assert(false, 'Extension from functional call failed to load');
}
