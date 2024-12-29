import { Module } from '@nestjs/common'
import { ExpenseController } from './expense.controller'
import { GetByUserExpenseUseCase } from './use-cases/get-by-user.uc'
import { CreateExpenseUseCase } from './use-cases/create.uc'
import { UpdateExpenseUseCase } from './use-cases/update.uc'
import { DeleteExpenseUseCase } from './use-cases/delete.uc'
import { DepInject } from '../../dep-inject'

@Module({
	controllers: [ExpenseController],
	providers: [
		GetByUserExpenseUseCase,
		CreateExpenseUseCase,
		UpdateExpenseUseCase,
		DeleteExpenseUseCase,
		{
			provide: 'ExpenseRepository',
			useValue: DepInject.Repositories.expensePostgresRepository
		}
	]
})
export class ExpenseModule {}
