import { Inject, Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../interfaces/repositories/expense.repository'
import { Dto } from '../../../models'
import { Mappers } from '../../mappers'
import { IExpenseUseCase } from '../../../api/interfaces'

@Injectable()
export class UpdateExpenseUseCase
	implements IExpenseUseCase.IUpdateExpenseUseCase
{
	constructor(
		@Inject('ExpenseRepository')
		private readonly expenseRepository: IExpenseRepository
	) {}

	execute = async (
		expense: Dto.Expense.UpdateExpenseDto
	): Promise<Dto.Expense.ExpenseDto> => {
		const currentExpense = await this.expenseRepository.getById(expense.id)

		currentExpense.name = expense.name
		currentExpense.installmentAmount = expense.installmentAmount
		currentExpense.dueDate = expense.dueDate

		await this.expenseRepository.update(currentExpense)

		return Mappers.Expense.entityToDto(currentExpense)
	}
}
