const path = require("path");

const NODE_ENV = process.env.NODE_ENV;

const isPrd = "prd" === NODE_ENV;

const PORT = isPrd ? 10000 : 11000;

const HOME_DIR = isPrd ? "E:/" : process.env.HOME;

const LIBRARY_ROOT = path.join(HOME_DIR, isPrd ? "VideoLibrary" : "Movies");

const WEB_STATIC = path.join(__dirname, "web");

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("PORT: ", PORT);
console.log("HOME_DIR: ", HOME_DIR);
console.log("LIBRARY_ROOT: ", LIBRARY_ROOT);
console.log("WEB_STATIC: ", WEB_STATIC);

module.exports = {
    PORT,
    HOME_DIR,
    LIBRARY_ROOT,
    NODE_ENV,
    WEB_STATIC,
};
