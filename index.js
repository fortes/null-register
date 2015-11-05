var fs = require('fs'),
    path = require('path');

var loadExtensionsFromPackageJson,
    nullHandler,
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

loadExtensionsFromPackageJson = function() {
  var currentPath,
      cwd = process.cwd(),
      dirs = cwd.split(path.sep),
      package;

  // Add missing slash for root
  dirs.unshift('/');

  do {
    currentPath = path.join.apply(null, dirs.concat('package.json'));

    if (fs.existsSync(currentPath)) {
      package = require(currentPath);
      if ('null-register' in package) {
        registerExtensions(package['null-register']);
        break;
      }
    }

    dirs.pop();
  } while (dirs.length > 1);
};

loadExtensionsFromPackageJson();
module.exports = registerExtensions;
