import { Knex } from "knex";

import { CONNECTION_STRING } from "./constants";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "../dev.sqlite3",
        },
        migrations: {
            tableName: "migrations",
        },
        seeds: {
            directory: "../seeds",
        },
        useNullAsDefault: true,
    },
    production: {
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
    },
};

export default config;
