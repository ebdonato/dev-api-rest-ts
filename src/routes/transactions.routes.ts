import { Router } from "express";
import validateSchema from "../helpers/validadeSchema";
import { createTransactionSchema, listTransactionsSchema } from "../schemas/transactions.schema";
import { createTransactionController, listTransactionsController } from "../controllers/transactions.controller";

const router = Router();

router.post("/", validateSchema(createTransactionSchema), createTransactionController);

router.get("/summary", validateSchema(listTransactionsSchema), listTransactionsController);

export default router;
