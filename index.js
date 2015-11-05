var nullHandler,
    registerExtensions;

if (!('extensions' in require)) {
  throw new Error('Unsupported node version, must have require.extensions.');
}

/**
 * @returns {!Object} An empty object
 */
nullHandler = function() {
  return {};
};

/**
 * Register null handlers for the given file extensions.
 *
 * @param {!Array<string>} extensions
 * @returns {undefined}
 */
registerExtensions = function(extensions) {
  extensions.forEach(function(ext) {
    require.extensions[ext] = nullHandler;
  });
};

if ('NODE_NULL_REGISTER' in process.env) {
  registerExtensions(process.env['NODE_NULL_REGISTER'].split(/\s+/));
}

module.exports = registerExtensions;
