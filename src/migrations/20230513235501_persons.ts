import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("persons", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email");
        table.string("cpf").notNullable();
        table.date("birth_date").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("persons");
}
