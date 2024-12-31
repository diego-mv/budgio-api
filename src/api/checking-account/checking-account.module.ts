import { Module } from '@nestjs/common'
import { IoC } from '../../ioc'
import { CheckingAccountController } from './checking-account.controller'
import { CheckingAccountService } from './checking-account.service'

@Module({
	controllers: [CheckingAccountController],
	providers: [
		CheckingAccountService,
		{
			provide: 'GetCheckingAccountByUserUseCase',
			useFactory: IoC.UseCases.CheckingAccount.getCheckingAccountByUserUseCase
		},
		{
			provide: 'CreateCheckingAccountUseCase',
			useFactory: IoC.UseCases.CheckingAccount.createCheckingAccountUseCase
		},
		{
			provide: 'UpdateCheckingAccountUseCase',
			useFactory: IoC.UseCases.CheckingAccount.updateCheckingAccountUseCase
		},
		{
			provide: 'DeleteCheckingAccountUseCase',
			useFactory: IoC.UseCases.CheckingAccount.deleteCheckingAccountUseCase
		}
	]
})
export class CheckingAccountModule {}
