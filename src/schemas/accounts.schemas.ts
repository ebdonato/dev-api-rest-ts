import { object, string, number, enum as zEnum, TypeOf } from "zod";
import { DEFAULT_MAX_DAILY_LIMIT, DEFAULT_MIN_DAILY_LIMIT } from "../constants";

export const createAccountSchema = object({
    body: object({
        person_id: number({
            required_error: "ID Pessoa é obrigatório",
        })
            .int()
            .positive()
            .positive(),
        daily_limit: number().gte(DEFAULT_MIN_DAILY_LIMIT).lte(DEFAULT_MAX_DAILY_LIMIT).optional(),
        type: number({
            required_error: "Tipo da Conta é obrigatório",
        })
            .int()
            .positive()
            .positive(),
    }),
});

export const findAccountSchema = object({
    params: object({
        id: string({
            required_error: "ID é obrigatório",
        }).refine((val) => /^\d+$/.test(val), {
            message: "ID deve ser um número inteiro",
        }),
    }),
});

export const updateStatusAccountSchema = object({
    body: object({
        status: zEnum(["active", "inactive"] as const, {
            required_error: "Situação da Conta é obrigatório ('active' ou 'inactive')",
        }),
    }),
}).merge(findAccountSchema);

export const updateDailyLimitAccountSchema = object({
    body: object({
        daily_limit: number({
            required_error: "Limite Diário é obrigatório",
        })
            .gte(DEFAULT_MIN_DAILY_LIMIT)
            .lte(DEFAULT_MAX_DAILY_LIMIT),
    }),
}).merge(findAccountSchema);

export const updateTypeAccountSchema = object({
    body: object({
        type: number({
            required_error: "Tipo da Conta é obrigatório",
        })
            .int()
            .positive()
            .positive(),
    }),
}).merge(findAccountSchema);

export const listAccountsSchema = object({
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
        orderBy: zEnum(["id", "balance", "daily_limit"] as const)
            .default("id")
            .optional(),
        descending: string()
            .refine((val) => ["true", "false", "1", "0"].includes(val), {
                message: "Opção inválida para ascendente/descendente",
            })
            .optional(),
        active: string()
            .refine((val) => ["true", "false", "1", "0"].includes(val), {
                message: "Opção inválida para Situação de Conta",
            })
            .optional(),
        types: string()
            .refine((val) => /^\d+$/.test(val) && +val >= 0, {
                message: "Tipo da Conta deve ser um número inteiro",
            })
            .array()
            .optional(),
        persons: string()
            .refine((val) => /^\d+$/.test(val) && +val >= 0, {
                message: "ID Pessoa deve ser um número inteiro",
            })
            .array()
            .optional(),
        balance: string()
            .refine((val) => /^-?\d+(?:\.\d+)?$/.test(val), {
                message: "Saldo deve ser um número",
            })
            .array()
            .length(2)
            .optional(),
    }),
});

export type createAccountInput = TypeOf<typeof createAccountSchema>["body"];

export type findAccountInput = TypeOf<typeof findAccountSchema>["params"];

export type updateStatusAccountInput = TypeOf<typeof updateStatusAccountSchema>;

export type updateDailyLimitAccountInput = TypeOf<typeof updateDailyLimitAccountSchema>;

export type updateTypeAccountInput = TypeOf<typeof updateTypeAccountSchema>;

export type listAccountsInput = TypeOf<typeof listAccountsSchema>["query"];
