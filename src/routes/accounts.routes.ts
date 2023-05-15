import { Router } from "express";
import validateSchema from "../helpers/validadeSchema";
import {
    createAccountSchema,
    findAccountSchema,
    listAccountsSchema,
    updateDailyLimitAccountSchema,
    updateStatusAccountSchema,
} from "../schemas/accounts.schemas";
import {
    createAccountController,
    deleteAccountController,
    findAccountController,
    listAccountsController,
    updateDailyLimitAccountController,
    updateStatusAccountController,
} from "../controllers/accounts.controllers";

const router = Router();

router.post("/", validateSchema(createAccountSchema), createAccountController);

router.get("/", validateSchema(listAccountsSchema), listAccountsController);

router.get("/:id", validateSchema(findAccountSchema), findAccountController);

router.delete("/:id", validateSchema(findAccountSchema), deleteAccountController);

router.patch("/:id/status", validateSchema(updateStatusAccountSchema), updateStatusAccountController);

router.patch("/:id/daily-limit", validateSchema(updateDailyLimitAccountSchema), updateDailyLimitAccountController);

router.patch("/:id/type", validateSchema(updateDailyLimitAccountSchema), updateDailyLimitAccountController);

export default router;
