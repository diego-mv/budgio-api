import { createZodDto } from 'nestjs-zod'
import {
	CreateExpenseSchema,
	UpdateExpenseSchema
} from '../schemas/expense.schema'
import { UserDto } from './user.dto'

export class ExpenseDto {
	id: string
	name: string
	installmentAmount: number
	dueDate: Date
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreateExpenseDto extends createZodDto(CreateExpenseSchema) {}
export class UpdateExpenseDto extends createZodDto(UpdateExpenseSchema) {}
