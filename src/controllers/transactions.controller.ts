import { Request, Response } from "express";
import log from "../helpers/logger";
import { createTransactionInput, listTransactionsInput } from "../schemas/transactions.schema";
import { findAccountById } from "../services/accounts.services";
import {
    createTransaction,
    listTransactions,
    summarizeDayWithdrawTransactions,
} from "../services/transactions.services";

export async function createTransactionController(req: Request<{}, {}, createTransactionInput>, res: Response) {
    try {
        log.info("Creating transaction");
        const { account_id, value } = req.body;

        const account = await findAccountById(+account_id);

        if (!account) {
            res.status(404).send({ message: "Conta não encontrada" });
            return;
        }

        if (!account.active) {
            res.status(406).send({ message: "Conta não ativa" });
            return;
        }

        if (value < 0 && account.balance < -value) {
            res.status(406).send({ message: "Saldo insuficiente" });
            return;
        }

        const remainingDayWithdraw = +account.daily_limit + (await summarizeDayWithdrawTransactions(account_id));

        if (value < 0 && remainingDayWithdraw < -value) {
            res.status(406).send({ message: "Limite Diário insuficiente" });
            return;
        }

        await createTransaction({ account_id, value });

        res.send({ message: "Transação criada com sucesso" });
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}

export async function listTransactionsController(req: Request<{}, {}, {}, listTransactionsInput>, res: Response) {
    try {
        log.info("Listing transactions");
        const { page, rowsPerPage, orderBy, descending, account, date_time, value_range } = req.query;
        const list = await listTransactions({
            page,
            rowsPerPage,
            orderBy,
            descending,
            account,
            date_time,
            value_range,
        });
        res.send(list);
    } catch (error) {
        log.error(error);
        res.status(500).send(error);
    }
}
