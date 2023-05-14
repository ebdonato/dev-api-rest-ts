import { Knex } from "knex";

import { PG_CONNECTION_STRING, SQL_FILE_PATH } from "./constants";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "sqlite3",
        connection: {
            filename: SQL_FILE_PATH,
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
        connection: PG_CONNECTION_STRING,
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
