import { Request, Response } from "express";
import log from "../helpers/logger";
import {
    createAccountInput,
    findAccountInput,
    listAccountsInput,
    updateDailyLimitAccountInput,
    updateStatusAccountInput,
    updateTypeAccountInput,
} from "../schemas/accounts.schemas";
import {
    createAccount,
    deleteAccountById,
    findAccountById,
    listAccounts,
    updateDailyLimitAccountById,
    updateStatusAccountById,
    updateTypeAccountById,
} from "../services/accounts.services";
import { findPersonById } from "../services/persons.services";

export async function createAccountController(req: Request<{}, {}, createAccountInput>, res: Response) {
    try {
        log.info("Creating person");
        const account = req.body;
        const person = await findPersonById(account.person_id);

        if (!person) {
            res.status(404).send({ message: "Pessoa não encontrada" });
            return;
        }

        await createAccount(account);
        res.send({ message: "Conta criada com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function findAccountController(req: Request<findAccountInput>, res: Response) {
    try {
        log.info("Finding account");
        const { id } = req.params;
        const account = await findAccountById(+id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        res.send({ account });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function updateStatusAccountController(
    req: Request<findAccountInput, {}, updateStatusAccountInput["body"]>,
    res: Response
) {
    try {
        log.info("Finding account");
        const { id } = req.params;
        const account = await findAccountById(+id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        const { status } = req.body;
        await updateStatusAccountById(+id, status === "active");
        res.send({ message: `Situação da Conta atualizada para ${status === "active" ? "Ativa" : "Inativa"}` });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function updateDailyLimitAccountController(
    req: Request<findAccountInput, {}, updateDailyLimitAccountInput["body"]>,
    res: Response
) {
    try {
        log.info("Finding account");
        const { id } = req.params;
        const account = await findAccountById(+id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        if (!account.active) {
            res.status(406).send({ message: "Conta não ativa" });
            return;
        }

        const { daily_limit } = req.body;
        await updateDailyLimitAccountById(+id, daily_limit);
        res.send({ message: `Limite Diário da Conta atualizado para ${daily_limit.toFixed(2)}` });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function updateTypeAccountController(
    req: Request<findAccountInput, {}, updateTypeAccountInput["body"]>,
    res: Response
) {
    try {
        log.info("Finding account");
        const { id } = req.params;
        const account = await findAccountById(+id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        if (!account.active) {
            res.status(406).send({ message: "Conta não ativa" });
            return;
        }

        const { type } = req.body;
        await updateTypeAccountById(+id, type);
        res.send({ message: `Tipo da Conta atualizado para ${type}` });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function listAccountsController(req: Request<{}, {}, {}, listAccountsInput>, res: Response) {
    try {
        log.info("Listing account");
        const { page, rowsPerPage, orderBy, descending, active, types, persons, balance } = req.query;
        const list = await listAccounts({ page, rowsPerPage, orderBy, descending, active, types, persons, balance });
        res.send(list);
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function deleteAccountController(req: Request<findAccountInput>, res: Response) {
    try {
        log.info("Deleting account");
        const { id } = req.params;
        const account = await findAccountById(+id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        await deleteAccountById(+id);
        res.send({ message: "Conta excluída com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}
