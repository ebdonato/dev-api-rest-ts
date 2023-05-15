import { object, string, coerce, enum as zEnum, TypeOf } from "zod";

export const createPersonSchema = object({
    body: object({
        name: string({
            required_error: "Nome é obrigatório",
        }),
        cpf: string({
            required_error: "CPF é obrigatório",
        }).length(11, "CPF deve conter 11 dígitos"),
        birth_date: coerce.date({
            required_error: "Data de Nascimento é obrigatório",
        }),
        email: string({
            required_error: "Email é obrigatório",
        })
            .email("Email inválido")
            .optional(),
    }),
});

export const findPersonSchema = object({
    params: object({
        id: string({
            required_error: "ID é obrigatório",
        }).refine((val) => /^\d+$/.test(val), {
            message: "ID deve ser um número inteiro",
        }),
    }),
});

export const updatePersonSchema = findPersonSchema.merge(createPersonSchema.deepPartial());

export const listPersonsSchema = object({
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
        orderBy: zEnum(["id", "name", "cpf", "birth_date"] as const)
            .default("id")
            .optional(),
        descending: string()
            .refine((val) => ["true", "false", "1", "0"].includes(val), {
                message: "Opção inválida para ascendente/descendente",
            })
            .optional(),
        search: string().optional(),
    }),
});

export type createPersonInput = TypeOf<typeof createPersonSchema>["body"];

export type findPersonInput = TypeOf<typeof findPersonSchema>["params"];

export type listPersonsInput = TypeOf<typeof listPersonsSchema>["query"];

export type updatePersonInput = TypeOf<typeof updatePersonSchema>;
