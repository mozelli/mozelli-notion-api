import z from "zod";

const userSchema = z.object({
    id: z.string().default(""),
    name: z.string().min(3, { message: "O nome do usuário deve ter no mínimo 3 caracteres." }),
    email: z.string().email("Formato de email inválido."),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Formado de senha inválido.")
});

export type UserType = z.infer<typeof userSchema>