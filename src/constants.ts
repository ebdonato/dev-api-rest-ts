import "dotenv/config";

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 3000;

export const SQL_FILE_PATH = process.env.SQL_FILE_PATH || "../dev.sqlite3";

export const PG_CONNECTION_STRING =
    process.env.PG_CONNECTION_STRING || "postgres://postgres:123456@localhost:5432/banco";
