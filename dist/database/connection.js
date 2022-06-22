"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_1 = tslib_1.__importDefault(require("pg"));
// import config from "../config/config";
// let connectionString = config.databaseConnectionString;
const db = new pg_1.default.Pool({
    user: "postgres",
    password: "venom3611",
    database: "express_postgres",
    host: "localhost",
    port: 5432,
});
exports.default = db;
