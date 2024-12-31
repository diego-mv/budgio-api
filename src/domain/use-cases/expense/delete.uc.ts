import { Inject, Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../interfaces/repositories/expense.repository'
import { IExpenseUseCase } from '../../../api/interfaces'

@Injectable()
export class DeleteExpenseUseCase
	implements IExpenseUseCase.IDeleteExpenseUseCase
{
	constructor(
		@Inject('ExpenseRepository')
		private readonly expenseRepository: IExpenseRepository
	) {}

	execute = async (expenseId: string): Promise<void> => {
		await this.expenseRepository.delete(expenseId)
	}
}
