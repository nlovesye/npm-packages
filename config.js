const path = require("path");

const PORT = 9000;

const HOME_DIR = process.env.HOME || "";

const BASE_URL = `http://10.0.2.94:${PORT}`;

module.exports = {
    PORT,
    HOME_DIR,
    LIBRARY_ROOT: path.join(HOME_DIR, "/Movies"),
    BASE_URL,
};
