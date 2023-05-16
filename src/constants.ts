import "dotenv/config";

export const PORT = process.env.PORT || "3000";

export const CONNECTION_STRING = process.env.CONNECTION_STRING || "postgres://postgres:123456@localhost:5432/banco";

export const LOG_TO_FILE = process.env.LOG_TO_FILE || "false";

export const DEFAULT_MAX_DAILY_LIMIT = parseInt(process.env.DEFAULT_MAX_DAILY_LIMIT || "1000");

export const DEFAULT_MIN_DAILY_LIMIT = parseInt(process.env.DEFAULT_MIN_DAILY_LIMIT || "100");

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:8080 http://localhost:9000";

export const LIMITER_MINUTES = parseInt(process.env.LIMITER_MINUTES || "15");

export const LIMITER_MAX_REQUEST = parseInt(process.env.LIMITER_MAX_REQUEST || "100");
