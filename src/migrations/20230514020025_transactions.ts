import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (table) => {
        table.increments("id").primary();
        table
            .integer("account_id")
            .notNullable()
            .references("id")
            .inTable("accounts")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.decimal("value").notNullable();
        table.datetime("date_time").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}
