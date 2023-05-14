import express, { Request, Response } from "express";
import knex from "knex";

import knexConfig from "./knexfile";
import { ENVIRONMENT } from "./constants";

const knexInstance = knex({
    ...knexConfig[ENVIRONMENT],
});

knexInstance.migrate.latest({
    directory: "./src/migrations",
});

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export default app;
