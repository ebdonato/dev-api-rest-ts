import { Request, Response } from "express";
import { createPersonInput, findPersonInput, listPersonsInput, updatePersonInput } from "../schemas/persons.schemas";
import {
    createPerson,
    deletePersonById,
    findPersonById,
    listPersons,
    updatePersonById,
} from "../services/persons.services";
import log from "../helpers/logger";

// TODO verificar se CPF já existe
export async function createPersonController(req: Request<{}, {}, createPersonInput>, res: Response) {
    try {
        log.info("Creating person");
        const person = req.body;
        await createPerson(person);
        res.send({ message: "Pessoa criada com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function findPersonController(req: Request<findPersonInput>, res: Response) {
    try {
        log.info("Finding person");
        const { id } = req.params;
        const person = await findPersonById(+id);

        if (!person) {
            res.status(404).send({ message: "Pessoa não encontrada" });
            return;
        }

        res.send({ person });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function listPersonsController(req: Request<{}, {}, {}, listPersonsInput>, res: Response) {
    try {
        log.info("Listing person");
        const { page, rowsPerPage, orderBy, descending, search } = req.query;
        const list = await listPersons({ page, rowsPerPage, orderBy, descending, search });
        res.send(list);
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

// TODO verificar se CPF já existe, caso esteja sendo atualizado
export async function updatePersonController(
    req: Request<updatePersonInput["params"], {}, updatePersonInput["body"]>,
    res: Response
) {
    try {
        log.info("Updating person");
        const { id } = req.params;
        const person = await findPersonById(+id);

        if (!person) {
            res.status(404).send({ message: "Pessoa não encontrada" });
            return;
        }

        const payload = req.body;

        if (!payload) {
            res.status(400).send({ message: "Nada para atualizar" });
            return;
        }

        await updatePersonById(+id, payload);
        res.send({ message: "Pessoa atualizada com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function deletePersonController(req: Request<findPersonInput>, res: Response) {
    try {
        log.info("Finding person");
        const { id } = req.params;
        const person = await findPersonById(+id);

        if (!person) {
            res.status(404).send({ message: "Pessoa não encontrada" });
            return;
        }

        await deletePersonById(+id);
        res.send({ message: "Pessoa excluída com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}
