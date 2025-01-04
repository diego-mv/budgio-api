import { z } from 'zod'

export const CreateExpenseSchema = z.object({
	installmentAmount: z.number(),
	installments: z.number(),
	amount: z.number(),
	name: z.string(),
	dueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	paid: z.boolean()
})

export const UpdateExpenseSchema = z.object({
	id: z.string().nonempty(),
	installmentAmount: z.number(),
	name: z.string(),
	dueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	paid: z.boolean(),
	installments: z.number(),
	amount: z.number()
})
