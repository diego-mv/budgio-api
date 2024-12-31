import { Module } from '@nestjs/common'
import { IoC } from '../../ioc'
import { ExpenseCreditCardController } from './expense-credit-card.controller'
import { ExpenseCreditCardService } from './expense-credit-card.service'

@Module({
	controllers: [ExpenseCreditCardController],
	imports: [],
	providers: [
		ExpenseCreditCardService,
		{
			provide: 'GetByCreditCardExpenseCreditCardUseCase',
			useFactory:
				IoC.UseCases.ExpenseCreditCard.getByCreditCardExpenseCreditCardUseCase
		},
		{
			provide: 'ImportExpensesCreditCardUseCase',
			useFactory: IoC.UseCases.ExpenseCreditCard.importExpensesCreditCardUseCase
		},
		{
			provide: 'CreateExpenseCreditCardUseCase',
			useFactory: IoC.UseCases.ExpenseCreditCard.createExpenseCreditCardUseCase
		},
		{
			provide: 'UpdateExpenseCreditCardUseCase',
			useFactory: IoC.UseCases.ExpenseCreditCard.updateExpenseCreditCardUseCase
		},
		{
			provide: 'DeleteExpenseCreditCardUseCase',
			useFactory: IoC.UseCases.ExpenseCreditCard.deleteExpenseCreditCardUseCase
		}
	]
})
export class ExpenseCreditCardModule {}
