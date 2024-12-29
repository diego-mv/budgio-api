import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ZodValidationPipe } from 'nestjs-zod'
import { User } from '../../infrastructure/server/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../infrastructure/server/guards/jwt-auth.guard'
import { Dto, Schema } from '../../models'
import { CreateCheckingAccountUseCase } from './use-cases/create.uc'
import { DeleteCheckingAccountUseCase } from './use-cases/delete.uc'
import { GetCheckingAccountByUserUseCase } from './use-cases/get-by-user.uc'
import { UpdateCheckingAccountUseCase } from './use-cases/update.uc'

@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('checking-account')
@Controller('checking-account')
export class CheckingAccountController {
	constructor(
		private readonly getCheckingAccountByUserUseCase: GetCheckingAccountByUserUseCase,
		private readonly createCheckingAccountUseCase: CreateCheckingAccountUseCase,
		private readonly updateCheckingAccountUseCase: UpdateCheckingAccountUseCase,
		private readonly deleteCheckingAccountUseCase: DeleteCheckingAccountUseCase
	) {}

	@Get('by-user')
	getCheckingAccountsByUser(@User() user: Dto.User.UserDto) {
		return this.getCheckingAccountByUserUseCase.execute(user.id)
	}

	@Post()
	create(
		@Body(
			new ZodValidationPipe(Schema.CheckingAccount.CreateCheckingAccountSchema)
		)
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) {
		return this.createCheckingAccountUseCase.execute(checkingAccount)
	}

	@Put()
	update(
		@Body(
			new ZodValidationPipe(Schema.CheckingAccount.UpdateCheckingAccountSchema)
		)
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountDto
	) {
		return this.updateCheckingAccountUseCase.execute(checkingAccount)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.deleteCheckingAccountUseCase.execute(id)
	}
}
