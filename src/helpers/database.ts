import knex from "knex";

import knexConfig from "../knexfile";
import { ENVIRONMENT } from "../constants";

const knexInstance = knex({
    ...knexConfig[ENVIRONMENT],
    ...(ENVIRONMENT === "development" && {
        connection: {
            filename: "./dev.sqlite3",
        },
    }),
});

export function migrateDatabase() {
    knexInstance.migrate.latest({
        directory: "./src/migrations",
    });
}

export default knexInstance;
