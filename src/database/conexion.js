const { Pool } = require("pg");

const softJobsDB = new Pool({
    host: "postgresql-mathiasdb.alwaysdata.net",
    user: "mathiasdb_admin",
    password: "18282323",
    database: "mathiasdb_soft_jobs",
    port: 5432,
    allowExitOnIdle: true
})
module.exports = softJobsDB;