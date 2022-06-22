"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const connection_1 = tslib_1.__importDefault(require("./connection"));
// get the contents of our init.sql file
const initPath = path_1.default.join(__dirname, "init.sql");
const initSQL = fs_1.default.readFileSync(initPath, "utf-8");
function build() {
  return connection_1.default
    .query(initSQL)
    .then(() => {
      console.log("Database built");
      connection_1.default.end(); // close the connection as we're finished
    })
    .catch(console.log);
}
// this will only run if this file is executed directly
// e.g. run `node solution/database/build.js` in your terminal
// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
// this allows us to use this to rebuild our DB easily
if (require.main === module) {
  build();
}
module.exports = build;
