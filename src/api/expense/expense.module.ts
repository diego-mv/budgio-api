import { Module } from '@nestjs/common'
import { IoC } from '../../ioc'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'

@Module({
	controllers: [ExpenseController],
	providers: [
		ExpenseService,
		{
			provide: 'GetByUserExpenseUseCase',
			useFactory: IoC.UseCases.Expense.getExpenseByUserUseCase
		},
		{
			provide: 'CreateExpenseUseCase',
			useFactory: IoC.UseCases.Expense.createExpenseUseCase
		},
		{
			provide: 'UpdateExpenseUseCase',
			useFactory: IoC.UseCases.Expense.updateExpenseUseCase
		},
		{
			provide: 'DeleteExpenseUseCase',
			useFactory: IoC.UseCases.Expense.deleteExpenseUseCase
		}
	]
})
export class ExpenseModule {}
