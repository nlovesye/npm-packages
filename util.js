const path = require("path");

const { LIBRARY_ROOT } = require("./config");

module.exports.resolveLibraryDir = function resolveLibraryDir(...dirs) {
    return path.join(LIBRARY_ROOT, ...dirs);
};
