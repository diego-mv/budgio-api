import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'
import { User } from './user.mapper'

export const Expense = {
	createToNewEntity: (
		userId: string,
		expense: Dto.Expense.CreateExpenseDto
	): Entities.IExpense => {
		return {
			id: generateUid(),
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			userId,
			createdAt: new Date(),
			updatedAt: new Date(),
			paid: expense.paid,
			amount: expense.amount,
			installments: expense.installments
		}
	},

	entityToDto: (expense: Entities.IExpense): Dto.Expense.ExpenseDto => {
		return {
			id: expense.id,
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			user: User.entityToDto(expense.user),
			createdAt: expense.createdAt,
			updatedAt: expense.updatedAt,
			paid: expense.paid,
			amount: expense.amount,
			installments: expense.installments
		}
	},

	dtoToEntity: (expense: Dto.Expense.ExpenseDto): Entities.IExpense => {
		return {
			id: generateUid(),
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			userId: expense.user.id,
			createdAt: new Date(),
			updatedAt: new Date(),
			paid: expense.paid,
			installments: expense.installments,
			amount: expense.amount
		}
	},

	entitiesToDto: (expenses: Entities.IExpense[]): Dto.Expense.ExpenseDto[] => {
		return expenses.map((expense) => Expense.entityToDto(expense))
	}
}
