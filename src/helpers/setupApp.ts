import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { ALLOWED_ORIGINS, ALLOW_ALL_ORIGINS, LIMITER_MAX_REQUEST, LIMITER_MINUTES } from "../constants";

export function setupApp(app: Express) {
    app.use(express.json());

    app.use(cors(ALLOW_ALL_ORIGINS ? {} : { origin: ALLOWED_ORIGINS.split(" ") }));

    app.use(helmet());

    app.use(
        rateLimit({
            windowMs: parseInt(LIMITER_MINUTES) * 60 * 1000,
            max: parseInt(LIMITER_MAX_REQUEST),
            standardHeaders: true,
            message: "Bloqueado por excesso de requisições. Tente mais tarde.",
        })
    );
}
