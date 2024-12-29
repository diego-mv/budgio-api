import { Module } from '@nestjs/common'
import { DepInject } from '../../dep-inject'
import { ExpenseCreditCardController } from './expense-credit-card.controller'
import { CreateExpenseCreditCardUseCase } from './use-cases/create.uc'
import { DeleteExpenseCreditCardUseCase } from './use-cases/delete.uc'
import { ImportExpensesCreditCardUseCase } from './use-cases/import-expenses-credit-card.uc'
import { UpdateExpenseCreditCardUseCase } from './use-cases/update.uc'
import { GetByCreditCardExpenseCreditCardUseCase } from './use-cases/get-by-credit-card.uc'

@Module({
	controllers: [ExpenseCreditCardController],
	imports: [],
	providers: [
		GetByCreditCardExpenseCreditCardUseCase,
		ImportExpensesCreditCardUseCase,
		CreateExpenseCreditCardUseCase,
		UpdateExpenseCreditCardUseCase,
		DeleteExpenseCreditCardUseCase,
		{
			provide: 'ExpenseCreditCardRepository',
			useValue: DepInject.Repositories.expenseCreditCardPostgresRepository
		},
		{
			provide: 'CreditCardRepository',
			useValue: DepInject.Repositories.creditCardPostgresRepository
		}
	]
})
export class ExpenseCreditCardModule {}
