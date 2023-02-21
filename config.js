const path = require("path");

const PORT = 10000;

const HOME_DIR = "E:/";

const LIBRARY_ROOT = path.join(HOME_DIR, "/Videos");

console.log("PORT: ", PORT);
console.log("HOME_DIR: ", HOME_DIR);
console.log("LIBRARY_ROOT: ", LIBRARY_ROOT);

module.exports = {
    PORT,
    HOME_DIR,
    LIBRARY_ROOT,
};
