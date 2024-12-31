import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'
import { User } from './user.mapper'

export const Expense = {
	createToNewEntity: (
		expense: Dto.Expense.CreateExpenseDto
	): Entities.IExpense => {
		return {
			id: generateUid(),
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			userId: expense.userId,
			createdAt: new Date(),
			updatedAt: new Date()
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
			updatedAt: expense.updatedAt
		}
	},

	dtoToEntity: (expense: Dto.Expense.CreateExpenseDto): Entities.IExpense => {
		return {
			id: generateUid(),
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			userId: expense.userId,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	},

	entitiesToDto: (expenses: Entities.IExpense[]): Dto.Expense.ExpenseDto[] => {
		return expenses.map((expense) => Expense.entityToDto(expense))
	}
}
