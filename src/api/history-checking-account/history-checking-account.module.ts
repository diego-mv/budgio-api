import { Module } from '@nestjs/common'
import { HistoryCheckingAccountController } from './history-checking-account.controller'
import { HistoryCheckingAccountService } from './history-checking-account.service'
import { IoC } from '../../ioc'

@Module({
	imports: [],
	controllers: [HistoryCheckingAccountController],
	providers: [
		HistoryCheckingAccountService,
		{
			provide: 'GetHistoryByCheckingAccountUseCase',
			useFactory:
				IoC.UseCases.HistoryCheckingAccount.getHistoryByCheckingAccountUseCase
		},
		{
			provide: 'GetLastExpenseCheckingAcccountUseCase',
			useFactory: IoC.UseCases.HistoryCheckingAccount.getLastExpenseUseCase
		},
		{
			provide: 'GetLastIncomeCheckingAccountUseCase',
			useFactory: IoC.UseCases.HistoryCheckingAccount.getLastIncomeUseCase
		}
	]
})
export class HistoryCheckingAccountModule {}
