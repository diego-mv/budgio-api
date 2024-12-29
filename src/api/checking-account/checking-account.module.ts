import { Module } from '@nestjs/common'
import { CheckingAccountController } from './checking-account.controller'
import { GetCheckingAccountByUserUseCase } from './use-cases/get-by-user.uc'
import { DepInject } from '../../dep-inject'
import { CreateCheckingAccountUseCase } from './use-cases/create.uc'
import { UpdateCheckingAccountUseCase } from './use-cases/update.uc'
import { DeleteCheckingAccountUseCase } from './use-cases/delete.uc'

@Module({
	controllers: [CheckingAccountController],
	providers: [
		GetCheckingAccountByUserUseCase,
		CreateCheckingAccountUseCase,
		UpdateCheckingAccountUseCase,
		DeleteCheckingAccountUseCase,
		{
			provide: 'CheckingAccountRepository',
			useValue: DepInject.Repositories.checkingAccountPostgressRepository
		}
	]
})
export class CheckingAccountModule {}
