import { Inject, Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../interfaces/repositories/expense.repository'
import { Dto } from '../../../models'
import { Mappers } from '../../mappers'
import { IExpenseUseCase } from '../../../api/interfaces'

@Injectable()
export class GetByUserExpenseUseCase
	implements IExpenseUseCase.IGetByUserExpenseUseCase
{
	constructor(
		@Inject('ExpenseRepository')
		private readonly expenseRepository: IExpenseRepository
	) {}

	execute = async (userId: string): Promise<Dto.Expense.ExpenseDto[]> => {
		const expenses = await this.expenseRepository.get({ userId })

		return Mappers.Expense.entitiesToDto(expenses)
	}
}
