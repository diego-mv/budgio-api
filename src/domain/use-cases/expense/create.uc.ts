import { Inject, Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../interfaces/repositories/expense.repository'
import { Dto } from '../../../models'
import { Mappers } from '../../mappers'
import { IExpenseUseCase } from '../../../api/interfaces'

@Injectable()
export class CreateExpenseUseCase
	implements IExpenseUseCase.ICreateExpenseUseCase
{
	constructor(
		@Inject('ExpenseRepository')
		private readonly expenseRepository: IExpenseRepository
	) {}

	execute = async (
		expense: Dto.Expense.CreateExpenseDto
	): Promise<Dto.Expense.ExpenseDto> => {
		const expenseEntity = Mappers.Expense.createToNewEntity(expense)
		const createdExpense = await this.expenseRepository.create(expenseEntity)

		return Mappers.Expense.entityToDto(createdExpense)
	}
}
