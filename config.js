const path = require("path");

const PORT = 10000;

const HOME_DIR = process.env.HOME || "";

console.log("HOME_DIR", HOME_DIR);

module.exports = {
    PORT,
    HOME_DIR,
    LIBRARY_ROOT: path.join(HOME_DIR, "/Movies"),
};
