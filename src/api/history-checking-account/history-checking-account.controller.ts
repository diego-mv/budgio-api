import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { HistoryCheckingAccountService } from './history-checking-account.service'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Guards } from '../server/guards'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('history-checking-account')
@Controller('history-checking-account')
export class HistoryCheckingAccountController {
	constructor(
		private readonly historyCheckingAccountService: HistoryCheckingAccountService
	) {}

	@Get('/by-checking-account/:checkingAccountId')
	getByCheckingAccount(@Param('checkingAccountId') checkingAccountId: string) {
		return this.historyCheckingAccountService.getByCheckingAccount(
			checkingAccountId
		)
	}

	@Get('/last-entry/:checkingAccountId')
	getLastEntry(@Param('checkingAccountId') checkingAccountId: string) {
		return this.historyCheckingAccountService.getLastEntry(checkingAccountId)
	}

	@Get('/last-expense/:checkingAccountId')
	getLastExpense(@Param('checkingAccountId') checkingAccountId: string) {
		return this.historyCheckingAccountService.getLastExpense(checkingAccountId)
	}
}
