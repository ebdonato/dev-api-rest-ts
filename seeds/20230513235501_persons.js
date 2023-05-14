// @ts-check
const { randBoolean, randFullName, randEmail, randNumber, randPastDate } = require("@ngneat/falso");
const NUMBER_PERSONS = 50;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("persons").del();

    const persons = Array.from({ length: NUMBER_PERSONS }, () => ({
        name: randFullName(),
        email: randBoolean() ? randEmail() : null,
        cpf: `${randNumber({ length: 11, min: 0, max: 9, precision: 1 })}`.split(",").join(""),
        birth_date: randPastDate(),
    }));

    await knex("persons").insert(persons);
};
