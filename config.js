const path = require("path");

const NODE_ENV = process.env.NODE_ENV;

const SYS = process.env.SYS;

const isPrd = "prd" === NODE_ENV;

const isMac = "mac" === SYS;

const PORT = isPrd ? 10000 : 9900;

const HOME_DIR = !isMac ? "E:/" : process.env.HOME;

const LIBRARY_ROOT = path.join(HOME_DIR, !isMac ? "VideoLibrary" : "Desktop/VideoLib");

const WEB_STATIC = path.join(__dirname, "web/build");

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("SYS: ", SYS);
console.log("PORT: ", PORT);
console.log("LIBRARY_ROOT: ", LIBRARY_ROOT);
console.log("WEB_STATIC: ", WEB_STATIC);

module.exports = {
    PORT,
    LIBRARY_ROOT,
    NODE_ENV,
    WEB_STATIC,
};
