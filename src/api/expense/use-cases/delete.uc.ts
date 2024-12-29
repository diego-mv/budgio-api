import { Inject, Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../../domain/interfaces/repositories/expense.repository'

@Injectable()
export class DeleteExpenseUseCase {
	constructor(
		@Inject('ExpenseRepository')
		private readonly expenseRepository: IExpenseRepository
	) {}

	execute = async (expenseId: string) => {
		await this.expenseRepository.delete(expenseId)
	}
}
