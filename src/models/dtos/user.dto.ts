import { createZodDto } from 'nestjs-zod'
import { CreateUserSchema } from '../schemas/user.schema'

export class UserDto {
	id: string
	name: string
	email: string
}

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
