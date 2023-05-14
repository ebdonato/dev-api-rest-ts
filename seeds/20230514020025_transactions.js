// @ts-check
const { randPastDate, randNumber } = require("@ngneat/falso");
const NUMBER_BATCHES = 100;
const NUMBER_TRANSACTIONS_PER_BATCH = 100;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("transactions").del();

    const idsAccounts = (await knex("accounts").select("id")).map((item) => item.id);

    // lotes por limitação de transações no SQLite
    for (let i = 0; i < NUMBER_BATCHES; i++) {
        const transactions = Array.from({ length: NUMBER_TRANSACTIONS_PER_BATCH }, () => ({
            account_id: idsAccounts[randNumber({ min: 0, max: idsAccounts.length - 1 })],
            value: randNumber({ min: -500, max: 500, fraction: 2 }),
            date_time: randPastDate(),
        }));

        await knex("transactions").insert(transactions);
    }

    // atualizar os saldos
    for (const idAccount of idsAccounts) {
        const transactions = await knex("transactions").where({ account_id: idAccount });

        const balance = transactions.reduce((acc, item) => acc + +item.value, 0);

        if (balance >= 0) {
            await knex("accounts").update({ balance }).where({ id: idAccount });
        } else {
            await knex("transactions").insert({ account_id: idAccount, value: -+balance });
        }
    }
};
