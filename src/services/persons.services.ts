import { createPersonInput, listPersonsInput, updatePersonInput } from "../schemas/persons.schemas";
import db from "../helpers/database";
import log from "../helpers/logger";
import listFromTable from "../helpers/listTable";

export async function createPerson(input: createPersonInput) {
    const [{ id }] = await db("persons").insert(input).returning("id");
    log.info(`Person created: ${id}`);
}

export async function findPersonById(id: number) {
    const person = await db("persons").select().where({ id }).first();
    person ? log.info("Person found") : log.info("Person not found");
    return person;
}

export async function listPersons(input: listPersonsInput) {
    const { page, rowsPerPage, orderBy = "id", descending, search } = input;
    const columnsToSearch = ["name", "email", "cpf"];
    const columnsToList = ["id", ...columnsToSearch, "birth_date"];

    const result = await listFromTable({
        tableName: "persons",
        columnsToSearch,
        columnsToList,
        page: page ? +page : 1,
        rowsPerPage: rowsPerPage ? +rowsPerPage : 0,
        orderBy,
        descending: descending === "true" || descending === "1",
        search,
    });

    log.info(`Persons found: ${result.rowsNumber}`);
    return result;
}

export async function updatePersonById(id: number, input: updatePersonInput["body"]) {
    if (!input) {
        log.warn("Person not updated");
        return;
    }
    await db("persons")
        .update({ ...input, updated_at: new Date() })
        .where({ id });

    log.info("Person updated");
}

export async function deletePersonById(id: number) {
    await db("persons").delete().where({ id });
    log.info("Person deleted");
}
