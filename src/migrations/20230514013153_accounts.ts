import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("accounts", (table) => {
        table.increments("id").primary();
        table
            .integer("person_id")
            .notNullable()
            .references("id")
            .inTable("persons")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.decimal("balance").notNullable().defaultTo(0);
        table.decimal("dailyLimit").notNullable();
        table.boolean("active").notNullable();
        table.integer("type").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("accounts");
}
