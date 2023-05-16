import db from "../helpers/database";
import listFromTable from "../helpers/listTable";
import log from "../helpers/logger";
import { createTransactionInput, listTransactionsInput } from "../schemas/transactions.schema";

export async function createTransaction(input: createTransactionInput) {
    const { account_id, value } = input;
    const trx = await db.transaction();

    try {
        const [{ id }] = await trx("transactions").insert(input).returning("id");

        const currentBalance = await getBalanceTransactions(account_id);

        const balance = currentBalance + +value;

        await trx("accounts").update({ balance, updated_at: new Date() }).where({ id: account_id });

        log.info(`New balance for Account ID ${account_id} is ${balance.toFixed(2)}`);

        await trx.commit();

        log.info(`Transaction created: ${id}`);
    } catch (error) {
        log.error("Transaction not created");
        await trx.rollback();
        throw error;
    }
}

export async function listTransactions(input: listTransactionsInput) {
    const { page, rowsPerPage, orderBy = "id", descending, date_time, account, value_range } = input;
    const columnsToList = ["id", "value", "date_time"];

    const result = await listFromTable({
        tableName: "transactions",
        columnsToList,
        page: page ? +page : 1,
        rowsPerPage: rowsPerPage ? +rowsPerPage : 0,
        orderBy,
        descending: descending === "true" || descending === "1",
        filterAnd: {
            account_id: [account],
        },
        filterBetween: {
            ...(date_time && { date_time: [date_time[0], date_time[1]] }),
            ...(value_range && { value: [value_range[0], value_range[1]] }),
        },
    });

    log.info(`Transactions found: ${result.rowsNumber}`);
    return result;
}

export async function findTransaction(id: number) {
    const transaction = await db("transactions").where({ id }).first();
    transaction ? log.info("Transaction found") : log.info("Transaction not found");
    return transaction;
}

export async function getBalanceTransactions(account_id: number) {
    const result = await listTransactions({
        account: `${account_id}`,
    });

    const value = result.items.reduce((acc, transaction) => acc + +transaction.value, 0) as number;

    log.info(`Current balance for Account ID ${account_id} is ${value.toFixed(2)}`);

    return value;
}

export async function summarizeDayWithdrawTransactions(account_id: number) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const result = await listTransactions({
        account: `${account_id}`,
        date_time: [start.toISOString(), end.toISOString()],
    });

    const value = result.items
        .filter((transaction) => +transaction.value < 0)
        .reduce((acc, transaction) => acc + +transaction.value, 0) as number;

    log.info(`Day withdraw for Account ID ${account_id} is ${value.toFixed(2)} | ${start}`);

    return value;
}
