import express, { Request, Response } from "express";

import { migrateDatabase } from "./helpers/database";
import { setupApp } from "./helpers/setupApp";

import personsRoutes from "./routes/persons.routes";
import accountsRoutes from "./routes/accounts.routes";

const app = express();

setupApp(app);

migrateDatabase();

app.use("/persons", personsRoutes);

app.use("/accounts", accountsRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.all("*", (req, res) => {
    res.status(404).send("🚫 Rota Inválida 🚫");
});

export default app;
