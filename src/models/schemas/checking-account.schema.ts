import { z } from 'zod'

export const CreateCheckingAccountSchema = z.object({
	name: z.string(),
	balance: z.number().min(0),
	color: z.string()
})

export const UpdateCheckingAccountSchema = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string()
})

export const UpdateCheckingAccountBalanceSchema = z.object({
	amount: z.number().min(0),
	type: z.enum(['balance', 'expense', 'income']),
	description: z.string().optional().nullable()
})
