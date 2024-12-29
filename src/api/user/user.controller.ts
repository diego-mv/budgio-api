import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../infrastructure/server/guards/jwt-auth.guard'
import { CreateUserUseCase } from './use-cases/create.uc'
import { GetUserUseCase } from './use-cases/get.uc'

@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private readonly getUserUseCase: GetUserUseCase,
		private readonly createUserUseCase: CreateUserUseCase
	) {}

	@Get(':id')
	@ApiParam({ name: 'id', type: 'string' })
	async getUser(id: string) {
		return this.getUserUseCase.execute(id)
	}

	// @Post()
	// async createUser(
	// 	@Body(new ZodValidationPipe(Schema.User.CreateUserSchema))
	// 	user: Dto.User.CreateUserDto
	// ) {
	// 	return this.createUserUseCase.execute(user)
	// }
}
