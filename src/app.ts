import express from "express";

import { migrateDatabase } from "./helpers/database";
import { setupApp } from "./helpers/setupApp";

import personsRoutes from "./routes/persons.routes";
import accountsRoutes from "./routes/accounts.routes";
import transactionsRoutes from "./routes/transactions.routes";
import generalRoutes from "./routes/general.routes";

const app = express();

setupApp(app);

migrateDatabase();

app.use("/persons", personsRoutes);

app.use("/accounts", accountsRoutes);

app.use("/transactions", transactionsRoutes);

app.use("/", generalRoutes);

app.all("*", (_, res) => {
    res.status(404).send("🚫 Rota Inválida 🚫");
});

export default app;
