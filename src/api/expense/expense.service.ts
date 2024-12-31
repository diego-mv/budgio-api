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

	getByUserExpense = async (userId: string) => {
		return this.getByUserExpenseUseCase.execute(userId)
	}

	createExpense = async (expense: Dto.Expense.CreateExpenseDto) => {
		return this.createExpenseUseCase.execute(expense)
	}

	updateExpense = async (expense: Dto.Expense.UpdateExpenseDto) => {
		return this.updateExpenseUseCase.execute(expense)
	}

	deleteExpense = async (id: string) => {
		return this.deleteExpenseUseCase.execute(id)
	}
}
