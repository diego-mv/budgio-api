import { Mappers } from '..'
import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'

export const Expense = {
	createToNewEntity: (
		expense: Dto.Expense.CreateExpenseDto
	): Entities.Expense => {
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

	entityToDto: (expense: Entities.Expense): Dto.Expense.ExpenseDto => {
		return {
			id: expense.id,
			name: expense.name,
			dueDate: expense.dueDate,
			installmentAmount: expense.installmentAmount,
			user: Mappers.User.entityToDto(expense.user),
			createdAt: expense.createdAt,
			updatedAt: expense.updatedAt
		}
	},

	dtoToEntity: (expense: Dto.Expense.CreateExpenseDto): Entities.Expense => {
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

	entitiesToDto: (expenses: Entities.Expense[]): Dto.Expense.ExpenseDto[] => {
		return expenses.map((expense) => Expense.entityToDto(expense))
	}
}
