import { Dto } from '../../../models'

export interface ICreateExpenseUseCase {
	execute(
		expense: Dto.Expense.CreateExpenseDto
	): Promise<Dto.Expense.ExpenseDto>
}

export interface IUpdateExpenseUseCase {
	execute(
		expense: Dto.Expense.UpdateExpenseDto
	): Promise<Dto.Expense.ExpenseDto>
}

export interface IDeleteExpenseUseCase {
	execute(expenseId: string): Promise<void>
}

export interface IGetByUserExpenseUseCase {
	execute(userId: string): Promise<Dto.Expense.ExpenseDto[]>
}
