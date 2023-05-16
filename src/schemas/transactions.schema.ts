import { object, number, string, enum as zEnum, TypeOf } from "zod";
import { DEFAULT_MAX_DAILY_LIMIT } from "../constants";

export const createTransactionSchema = object({
    body: object({
        account_id: number({
            required_error: "ID Pessoa é obrigatório",
        })
            .int()
            .positive()
            .positive(),
        value: number({
            required_error: "Valor é obrigatório",
        })
            .gte(-DEFAULT_MAX_DAILY_LIMIT)
            .lte(DEFAULT_MAX_DAILY_LIMIT),
    }),
});

export const findTransactionSchema = object({
    params: object({
        id: string({
            required_error: "ID é obrigatório",
        }).refine((val) => /^\d+$/.test(val), {
            message: "ID deve ser um número inteiro",
        }),
    }),
});

export const listTransactionsSchema = object({
    query: object({
        page: string()
            .refine((val) => /^\d+$/.test(val) && +val > 0, {
                message: "Página deve ser um número inteiro maior ou igual a 1",
            })
            .optional(),
        rowsPerPage: string()
            .refine((val) => /^\d+$/.test(val) && +val >= 0, {
                message: "Items Por Página deve ser um número inteiro",
            })
            .optional(),
        orderBy: zEnum(["id", "value", "date_time"] as const)
            .default("id")
            .optional(),
        descending: string()
            .refine((val) => ["true", "false", "1", "0"].includes(val), {
                message: "Opção inválida para ascendente/descendente",
            })
            .optional(),
        account: string().refine((val) => /^\d+$/.test(val) && +val >= 0, {
            message: "ID Pessoa deve ser um número inteiro",
        }),
        date_time: string().datetime().array().length(2).optional(),
        value_range: string()
            .refine((val) => /^-?\d+(?:\.\d+)?$/.test(val), {
                message: "Saldo deve ser um número",
            })
            .array()
            .length(2)
            .optional(),
    }),
});

export type createTransactionInput = TypeOf<typeof createTransactionSchema>["body"];

export type listTransactionsInput = TypeOf<typeof listTransactionsSchema>["query"];
