import knex from "knex";

import knexConfig from "../knexfile";

const knexInstance = knex(knexConfig);

export function migrateDatabase() {
    knexInstance.migrate.latest({
        directory: "./src/migrations",
    });
}

export default knexInstance;
