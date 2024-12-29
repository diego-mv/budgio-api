import { createZodDto } from 'nestjs-zod'
import {
	CreateCheckingAccountSchema,
	UpdateCheckingAccountSchema
} from '../schemas/checking-account.schema'
import { UserDto } from './user.dto'

export class CheckingAccountDto {
	id: string
	balance: number
	name: string
	color: string
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreateCheckingAccountDto extends createZodDto(
	CreateCheckingAccountSchema
) {}
export class UpdateCheckingAccountDto extends createZodDto(
	UpdateCheckingAccountSchema
) {}
