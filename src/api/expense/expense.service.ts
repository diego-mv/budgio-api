import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { IExpenseUseCase } from '../interfaces'

@Injectable()
export class ExpenseService {
	constructor(
		@Inject('GetByUserExpenseUseCase')
		private readonly getByUserExpenseUseCase: IExpenseUseCase.IGetByUserExpenseUseCase,
		@Inject('CreateExpenseUseCase')
		private readonly createExpenseUseCase: IExpenseUseCase.ICreateExpenseUseCase,
		@Inject('UpdateExpenseUseCase')
		private readonly updateExpenseUseCase: IExpenseUseCase.IUpdateExpenseUseCase,
		@Inject('DeleteExpenseUseCase')
		private readonly deleteExpenseUseCase: IExpenseUseCase.IDeleteExpenseUseCase
	) {}

	getByUserExpense = async (userId: string, page: number, pageSize: number) => {
		return this.getByUserExpenseUseCase.execute(userId, page, pageSize)
	}

	createExpense = async (
		userId: string,
		expense: Dto.Expense.CreateExpenseDto
	) => {
		return this.createExpenseUseCase.execute(userId, expense)
	}

	updateExpense = async (expense: Dto.Expense.UpdateExpenseDto) => {
		return this.updateExpenseUseCase.execute(expense)
	}

	deleteExpense = async (id: string) => {
		return this.deleteExpenseUseCase.execute(id)
	}
}
