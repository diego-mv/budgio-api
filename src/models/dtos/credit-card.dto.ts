import { createZodDto } from 'nestjs-zod'
import {
	CreateCreditCardSchema,
	UpdateCreditCardSchema
} from '../schemas/credit-card.schema'
import { UserDto } from './user.dto'

export class CreditCardDto {
	id: string
	creditLimit: number
	name: string
	color: string
	dueDate: Date
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreditCardImportDto {
	date: string
	description: string
	holder: string
	amount: number
	pendingInstallments: number
	installmentAmount: number
}

export class CreateCreditCardDto extends createZodDto(CreateCreditCardSchema) {}
export class UpdateCreditCardDto extends createZodDto(UpdateCreditCardSchema) {}
