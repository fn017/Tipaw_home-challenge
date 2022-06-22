import pg from "pg";
import config from "../config/config";

const db = new pg.Pool({
  connectionString: config.databaseConnectionString,
});

export default db;
