import { Router } from "express";
import validateSchema from "../helpers/validadeSchema";
import {
    createPersonSchema,
    findPersonSchema,
    listPersonsSchema,
    updatePersonSchema,
} from "../schemas/persons.schemas";
import {
    createPersonController,
    deletePersonController,
    findPersonController,
    listPersonsController,
    updatePersonController,
} from "../controllers/persons.controllers";

const router = Router();

router.post("/", validateSchema(createPersonSchema), createPersonController);

router.get("/", validateSchema(listPersonsSchema), listPersonsController);

router.get("/:id", validateSchema(findPersonSchema), findPersonController);

router.put("/:id", validateSchema(updatePersonSchema), updatePersonController);

router.delete("/:id", validateSchema(findPersonSchema), deletePersonController);

export default router;
