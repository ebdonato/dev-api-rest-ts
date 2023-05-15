import { Knex } from "knex";
import { z } from "zod";

import db from "./database";

const props = z.object({
    tableName: z.string(),
    columnsToSearch: z.array(z.string()).optional(),
    columnsToList: z.array(z.string()),
    page: z.number().int().gte(1),
    rowsPerPage: z.number().int().nonnegative(),
    orderBy: z.string(),
    descending: z.boolean().optional(),
    search: z.string().optional(),
    searchInsensitive: z.boolean().optional(),
    filterAnd: z.record(z.array(z.any())).optional(),
    filterBetween: z.record(z.tuple([z.any(), z.any()])).optional(),
});

// type Props = Partial<
//     Pick<
//         z.infer<typeof props>,
//         "page" | "rowsPerPage" | "descending" | "searchInsensitive" | "filterAnd" | "filterBetween" | "search"
//     >
// > &
//     Pick<
//         z.infer<typeof props>,
//         "tableName" | "columnsToSearch" | "columnsToList" | "searchInsensitive" | "filterAnd" | "filterBetween"
//     >;

type Props = z.infer<typeof props>;

export async function listFromTable(input: Props) {
    const {
        tableName,
        columnsToSearch = [],
        columnsToList,
        page,
        rowsPerPage,
        orderBy,
        descending = false,
        search,
        filterAnd = {},
        filterBetween = {},
        searchInsensitive = true,
    } = props.parse(input);

    const filterBetweenClause = (builder: Knex.QueryBuilder) => {
        Object.entries(filterBetween).forEach(([column, values]) => {
            builder = builder.where((builder) => builder.whereBetween(column, values));
        });

        return builder;
    };

    const filterAndClause = (builder: Knex.QueryBuilder) => {
        Object.entries(filterAnd).forEach(([column, values]) => {
            const filterBy = values.filter((value) => value !== undefined);
            builder = builder.where((builder) => (filterBy.length ? builder.whereIn(column, filterBy) : builder));
        });

        return builder;
    };

    const searchClause = (builder: Knex.QueryBuilder) => {
        search &&
            columnsToSearch.forEach((el) => {
                builder = searchInsensitive
                    ? builder.orWhereILike(el, `%${search}%`)
                    : builder.orWhereLike(el, `%${search}%`);
            });

        return builder;
    };

    const result = (await db(tableName)
        .where(filterBetweenClause)
        .where(filterAndClause)
        .where(searchClause)
        .count("id as count")
        .first()) as Record<string, string | number>;

    const rowsNumber: number = +result.count;
    const limit = rowsPerPage || rowsNumber;
    const pages = Math.ceil(rowsNumber / limit) || 1;
    const currentPage = page > pages ? pages : page;
    const offset = currentPage * rowsPerPage - rowsPerPage;

    const items = await db(tableName)
        .column(columnsToList)
        .select()
        .where(filterBetweenClause)
        .where(filterAndClause)
        .where(searchClause)
        .orderBy(orderBy, descending ? "desc" : "asc")
        .limit(limit)
        .offset(offset);

    return {
        [tableName]: items,
        currentPage,
        pages,
        rowsNumber,
    };
}

export default listFromTable;
