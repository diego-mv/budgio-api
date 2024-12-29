import { createZodDto } from 'nestjs-zod'
import {
	CreateExpenseCreditCardSchema,
	UpdateExpenseCreditCardSchema
} from '../schemas/expense-credit-card.schema'
import { CreditCardDto } from './credit-card.dto'

export class ExpenseCreditCardDto {
	id: string
	creditCard: CreditCardDto
	name: string
	issueDate: Date
	totalInstallments: number
	installmentAmount: number
	totalCost: number
	createdAt: Date
	updatedAt: Date | null
}

export class CreateExpenseCreditCardDto extends createZodDto(
	CreateExpenseCreditCardSchema
) {}
export class UpdateExpenseCreditCardDto extends createZodDto(
	UpdateExpenseCreditCardSchema
) {}
