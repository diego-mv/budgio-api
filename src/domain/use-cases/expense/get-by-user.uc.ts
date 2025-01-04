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

	execute = async (
		userId: string,
		page: number = 1,
		pageSize: number = 10
	): Promise<Dto.PaginatedData<Dto.Expense.ExpenseDto>> => {
		const { items, total } = await this.expenseRepository.getByUserPaginated(
			userId,
			page,
			pageSize
		)
		const expenses = Mappers.Expense.entitiesToDto(items)

		return {
			data: expenses,
			total,
			page,
			pageSize
		}
	}
}
