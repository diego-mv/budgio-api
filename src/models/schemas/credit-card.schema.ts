import { z } from 'zod'

export const CreateCreditCardSchema = z.object({
	creditLimit: z.number().min(0),
	dueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	name: z.string(),
	color: z.string()
})

export const UpdateCreditCardSchema = z.object({
	id: z.string(),
	creditLimit: z.number().min(0),
	dueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	name: z.string(),
	color: z.string()
})
