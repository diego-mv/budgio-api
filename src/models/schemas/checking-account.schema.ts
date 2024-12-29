import { z } from 'zod'

export const CreateCheckingAccountSchema = z.object({
	name: z.string(),
	balance: z.number().min(0),
	color: z.string(),
	userId: z.string()
})

export const UpdateCheckingAccountSchema = z.object({
	id: z.string(),
	name: z.string(),
	balance: z.number().min(0),
	color: z.string()
})
