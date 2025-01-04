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
import { Dto, Schema } from '../../models'
import { Decorators } from '../server/decorators'
import { Guards } from '../server/guards'
import { Pipes } from '../server/pipes'
import { CheckingAccountService } from './checking-account.service'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('checking-account')
@Controller('checking-account')
export class CheckingAccountController {
	constructor(
		private readonly checkingAccountService: CheckingAccountService
	) {}

	@Get('by-user')
	getCheckingAccountsByUser(@Decorators.User() user: Dto.User.UserDto) {
		return this.checkingAccountService.getCheckingAccountsByUser(user.id)
	}

	@Post()
	create(
		@Body(
			new Pipes.ZodValidationPipe(
				Schema.CheckingAccount.CreateCheckingAccountSchema
			)
		)
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) {
		return this.checkingAccountService.createCheckingAccount(checkingAccount)
	}

	@Put('/update-balance/:id')
	updateBalance(
		@Param('id') id: string,
		@Body(
			new Pipes.ZodValidationPipe(
				Schema.CheckingAccount.UpdateCheckingAccountBalanceSchema
			)
		)
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountBalanceDto
	) {
		return this.checkingAccountService.updateCheckingAccountBalance(
			id,
			checkingAccount
		)
	}

	@Put()
	update(
		@Body(
			new Pipes.ZodValidationPipe(
				Schema.CheckingAccount.UpdateCheckingAccountSchema
			)
		)
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountDto
	) {
		return this.checkingAccountService.updateCheckingAccount(checkingAccount)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.checkingAccountService.deleteCheckingAccount(id)
	}
}
