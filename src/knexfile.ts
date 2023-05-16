import { Knex } from "knex";

import { CONNECTION_STRING } from "./constants";

const config: Knex.Config = {
    client: "postgresql",
    connection: CONNECTION_STRING,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "migrations",
    },
    seeds: {
        directory: "../seeds",
    },
};

export default config;
