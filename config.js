const path = require("path");

const NODE_ENV = process.env.NODE_ENV;

const isPrd = "prd" === NODE_ENV;

const PORT = 10000;

const HOME_DIR = isPrd ? "E:/" : process.env.HOME;

const LIBRARY_ROOT = path.join(HOME_DIR, isPrd ? "VideoLibrary" : "Movies");

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("PORT: ", PORT);
console.log("HOME_DIR: ", HOME_DIR);
console.log("LIBRARY_ROOT: ", LIBRARY_ROOT);

module.exports = {
    PORT,
    HOME_DIR,
    LIBRARY_ROOT,
    NODE_ENV,
};
