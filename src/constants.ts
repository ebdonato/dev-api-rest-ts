import "dotenv/config";

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 3000;

export const CONNECTION_STRING = process.env.CONNECTION_STRING || "postgres://postgres:123456@localhost:5432/banco";

export const LOG_TO_FILE = process.env.LOG_TO_FILE || "false";

export const ALLOW_ALL_ORIGINS = process.env.ALLOW_ALL_ORIGINS || "true";

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:8080 http://localhost:9000";

export const LIMITER_MINUTES = process.env.LIMITER_MINUTES || "15";

export const LIMITER_MAX_REQUEST = process.env.LIMITER_MAX_REQUEST || "100";
