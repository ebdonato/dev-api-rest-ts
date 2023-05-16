import db from "../helpers/database";
import listFromTable from "../helpers/listTable";
import log from "../helpers/logger";
import { createAccountInput, listAccountsInput } from "../schemas/accounts.schemas";

export async function createAccount(input: createAccountInput) {
    const { type, person_id, daily_limit } = input;
    const [{ id }] = await db("accounts").insert({ type, person_id, daily_limit }).returning("id");
    log.info(`Account created: ${id}`);
}

export async function findAccountById(id: number) {
    const account = await db("accounts").select().where({ id }).first();
    account ? log.info("Account found") : log.info("Account not found");
    return account;
}

export async function updateStatusAccountById(id: number, active: boolean) {
    await db("accounts").update({ active, updated_at: new Date() }).where({ id });
    log.info(`Account status updated to ${active ? "Active" : "Inactive"}`);
}

export async function updateDailyLimitAccountById(id: number, daily_limit: number) {
    const value = daily_limit.toFixed(2);
    await db("accounts").update({ daily_limit: value, updated_at: new Date() }).where({ id });
    log.info(`Account Daily Limit updated to ${value}`);
}

export async function updateTypeAccountById(id: number, type: number) {
    await db("accounts").update({ type, updated_at: new Date() }).where({ id });
    log.info(`Account Type updated to ${type}`);
}

export async function listAccounts(input: listAccountsInput) {
    const { page, rowsPerPage, orderBy = "id", descending, active, types, persons, balance } = input;
    const columnsToList = ["id", "balance", "daily_limit", "active", "type", "person_id"];

    const result = await listFromTable({
        tableName: "accounts",
        columnsToList,
        page: page ? +page : 1,
        rowsPerPage: rowsPerPage ? +rowsPerPage : 0,
        orderBy,
        descending: descending === "true" || descending === "1",
        filterAnd: {
            ...(active && { active: [active === "true" || active === "1"] }),
            ...(types && { type: types.map((type) => +type) }),
            ...(persons && { person_id: persons.map((person) => +person) }),
        },
        filterBetween: {
            ...(balance && { balance: [+balance[0], +balance[1]] }),
        },
    });

    log.info(`Accounts found: ${result.rowsNumber}`);
    return result;
}

export async function deleteAccountById(id: number) {
    await db("accounts").delete().where({ id });
    log.info("Account deleted");
}
