// @ts-check
const { randBoolean, randNumber } = require("@ngneat/falso");
const NUMBER_ACCOUNTS = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("accounts").del();

    const idsPersons = (await knex("persons").select("id")).map((item) => item.id);

    const accounts = Array.from({ length: NUMBER_ACCOUNTS }, () => ({
        person_id: idsPersons[randNumber({ min: 0, max: idsPersons.length - 1 })],
        daily_limit: randNumber({ min: 100, max: 1000, fraction: 0, precision: 100 }),
        active: randBoolean(),
        type: randNumber({ min: 1, max: 5, fraction: 0, precision: 1 }),
    }));

    await knex("accounts").insert(accounts);
};
