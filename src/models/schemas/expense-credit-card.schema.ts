import { z } from 'zod'

export const CreateExpenseCreditCardSchema = z.object({
	creditCardId: z.string(),
	name: z.string(),
	issueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	totalInstallments: z.number(),
	installmentAmount: z.number(),
	totalCost: z.number()
})

export const UpdateExpenseCreditCardSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	issueDate: z
		.string()
		.default(new Date().toISOString())
		.transform((value) => new Date(value)),
	totalInstallments: z.number().min(0),
	installmentAmount: z.number().min(1),
	totalCost: z.number().min(1)
})
