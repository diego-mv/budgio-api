import { Module } from '@nestjs/common'
import { DepInject } from '../../dep-inject'
import { CreditCardController } from './credit-card.controller'
import { CreateCreditCardUseCase } from './use-cases/create.uc'
import { GetCreditCardByUserUseCase } from './use-cases/get-by-user.uc'
import { UpdateCreditCardUseCase } from './use-cases/update.uc'
import { DeleteCreditCardUseCase } from './use-cases/delete.uc'

@Module({
	controllers: [CreditCardController],
	providers: [
		CreateCreditCardUseCase,
		UpdateCreditCardUseCase,
		GetCreditCardByUserUseCase,
		DeleteCreditCardUseCase,
		{
			provide: 'CreditCardRepository',
			useValue: DepInject.Repositories.creditCardPostgresRepository
		}
	]
})
export class CreditCardModule {}
